import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../auth/firebase';

export const fetchFiles = createAsyncThunk('homeStorage/fetchFiles', async ( { searchQuery } = {} , thunkAPI) => {
    try {
        const user = auth.currentUser;
        if (!user) return [];

        const data = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)));
        const storage = data?.docs[0]?.data()?.storage || [];

        const tableRows = await Promise.all(
            storage.map(async (row) => {
                const docRef = doc(db, 'storage', row.docid);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) return null;
                const docData = docSnap.data();

                return {
                    key: row.docid,
                    uid: docData.owner,
                    name: docData.fileName,
                    file: docData.url,
                    type: docData.fileType,
                    profile: docData.profile,
                    email: docData.email,
                    uploadOn: row.time?.toDate().toISOString(),
                };
            })
        );

        if(searchQuery != undefined){
            return tableRows.filter(Boolean).reverse().filter(row => row.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return tableRows.filter(Boolean).reverse();
    } catch (error) {
        console.error("Error:", error);
        toast.error('Please try again later!');
        return thunkAPI.rejectWithValue(error.message);
    }
});

const homeSlice = createSlice({
    name: 'homeStorage',
    initialState: {
        tableRows: [],
        loading: false,
        error: null,
    },
    reducers: {
        sortByNameAsc: (state) => {
            state.tableRows = state.tableRows.slice().sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        },
        sortByNameDesc: (state) => {
            state.tableRows = state.tableRows.slice().sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        },
        sortByDateAsc: (state) => {
            state.tableRows = state.tableRows.slice().sort((a, b) =>
                new Date(a.uploadOn?.seconds * 1000) - new Date(b.uploadOn?.seconds * 1000)
            );
        },
        sortByDateDesc: (state) => {
            state.tableRows = state.tableRows.slice().sort((a, b) =>
                new Date(b.uploadOn?.seconds * 1000) - new Date(a.uploadOn?.seconds * 1000)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.tableRows = action.payload;
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { sortByNameAsc, sortByNameDesc, sortByDateAsc, sortByDateDesc } = homeSlice.actions;
export default homeSlice.reducer;

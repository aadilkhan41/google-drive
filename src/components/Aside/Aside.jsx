import styles from './styles.module.css';
import axios from "axios";
import Add from '../../assets/Add';
import Options from '../Options/Options';
import { extractType } from '../../functions/function';
import { useDispatch, useSelector } from 'react-redux';
import { updateFile, updateFileType, updatePercentage } from '../../redux/uploadSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, updateDoc, collection, doc, arrayUnion, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../../auth/firebase';
import { useEffect, useState } from 'react';

function Aside({ addButtonRef }) {
    const [storageLimit, setStorageLimit] = useState(0);
    const dispatch = useDispatch();
    const userDocId = useSelector((state) => state.userProfile.docid);

    const uploadImage = async (userDocId, fileObject) => {
        try {
            const formData = new FormData();
            formData.append("file", fileObject);
            formData.append("upload_preset", "your_unsigned_upload_preset");
            let filetype = extractType(fileObject.type);
            
            dispatch(updateFile(fileObject.name));
            dispatch(updateFileType(filetype));
            dispatch(updatePercentage(0));
    
            let urlType = 'raw';
            if (filetype == 'img') urlType = 'image';
            else if (filetype == 'video') urlType = 'video';

            const res = await axios.post(`https://api.cloudinary.com/v1_1/defcmlp3n/${urlType}/upload`, formData,
                {onUploadProgress: (event) => {
                    const percent = Math.round((event.loaded * 100) / event.total);
                    if(percent<100){
                        dispatch(updatePercentage(percent));
                    }
                }}
            );

            if (res.data != null) {
                addFile(userDocId, {
                    url: res.data.secure_url,
                    createdon: new Date(),
                    owner: auth.currentUser.uid,
                    fileName: fileObject.name,
                    fileType: filetype,
                    profile: auth.currentUser.photoURL,
                    email: auth.currentUser.email,
                    size: fileObject.size,
                });
            }
        } catch (err) {
            console.error("Upload failed:", err);
            toast.error('Failed! Try again.');
        }
    };

    const addFile = async (userDocId, fileObj) => {
        try {
            const docRef = await addDoc(collection(db, "storage"), fileObj);
            const file = {
                docid: docRef.id,
                time: new Date()
            };
            updateStorage(userDocId, file);
        } catch (error) {
            toast.error('Failed! Try again.');
        }
    };

    const updateStorage = async (userDocId, storageObj) => {
        try{
            const docRef = doc(db, "users", userDocId);
            await updateDoc(docRef, {
                storage: arrayUnion(storageObj),
            });
            dispatch(updatePercentage(100));
            toast.success('Upload successful!');
        } catch (error) {
            console.error("Error updating file:", error);
            toast.error('Failed! Try again.');
        }
    };

    useEffect(()=>{
        const fetchstorage = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;
        
                const q = query(collection(db, "storage"), where("owner", "==", user.uid));
                const data = await getDocs(q);
                const totalSize = data.docs.reduce((acc, doc) => {
                    const docSize = doc.data().size || 0;
                    return acc + docSize;
                }, 0);
                
                setStorageLimit((totalSize / (1024 * 1024 * 1024)).toFixed(2));
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchstorage();
    })

    return (
        <aside className={styles.aside}>
            <div className={styles.add}>
                <section className={styles.uploadBtn}>
                    <div><Add /><p>New</p></div>
                    <input ref={addButtonRef} type='file' name='file' onChange={(e) => uploadImage(userDocId, e.target.files[0])} accept='image/*, video/*, audio/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation' />
                </section>
            </div>
            <Options />
            <div className={styles.storageLevel}>
                <div><span style={{width: ((storageLimit*100)/10)+'%'}}></span></div>
                <p>{storageLimit} GB of 10 GB used</p>
                <button>Get more storage</button>
            </div>
        </aside>
    );
}

export default Aside;
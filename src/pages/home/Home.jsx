import styles from './styles.module.css';
import { useEffect, useState } from 'react';

import Article from '../../components/Article/Article';
import RenderIcon from '../../components/RenderIcon/RenderIcon';
import NoData from '../../components/NoData/NoData';
import ShareWith from '../../components/ShareWith/ShareWith';
import Loader from '../../components/Loader/Loader';

import { auth } from '../../auth/firebase';
import { formatDate } from '../../functions/function';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../../redux/homeSlice';

import Dehaze from '../../assets/Dehaze';
import GridView from '../../assets/GridView';
import MoreVert from '../../assets/MoreVert';
import Group from '../../assets/Group';
import MyDrive from '../../assets/MyDrive';

function Home() {
    const dispatch = useDispatch();
    const { tableRows, loading, error } = useSelector((state) => state.homeStorage);
    useEffect(() => {
        dispatch(fetchFiles());
    }, []);

    const [shareWithCont, setShareWithCont] = useState(false);
    const [shareDocId, setShareDocId] = useState(null);
    const [layout, setLayout] = useState(true);

    function setShareinfo(docid) {
        setShareDocId(docid);
        setShareWithCont(true);
    }

    return (
        <>
            <main className={styles.main}>
                <header className={styles.headOption}>
                    <section>
                        <h1>Welcome to Drive</h1>
                        <div className={styles.layoutOption}>
                            <button className={layout ? '' : styles.active} onClick={() => setLayout(false)}><Dehaze /></button>
                            <button className={layout ? styles.active : ''} onClick={() => setLayout(true)}><GridView /></button>
                        </div>
                    </section>
                </header>
                {loading ? <section className={styles.loadsection}><Loader /></section> : <>
                    {tableRows.length === 0 ? <>
                        <NoData />
                    </> : <>
                        {layout ? <>
                            <main className={styles.articles}>
                                {tableRows.map((articledata) => {
                                    return (<Article key={articledata.key} label='home' articledata={articledata} setShareinfo={setShareinfo} />);
                                })}
                            </main>
                        </> : <>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Reason suggested</th>
                                        <th>Owner</th>
                                        <th>Location</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows.map((articledata) => {
                                        return (
                                            <tr key={articledata.key}>
                                                <td><section className={styles.name}><div><RenderIcon fileType={articledata.type} /></div>{articledata.name}</section></td>
                                                {articledata.uid === auth.currentUser.uid ? <>
                                                    <td><section className={styles.reason}>You uploaded on {formatDate(articledata.uploadOn)}</section></td>
                                                    <td><section className={styles.owner}><div><img src={articledata.profile} alt="Profile" /></div>me</section></td>
                                                    <td><section className={styles.location}><div><MyDrive /></div>me</section></td>
                                                </> : <>
                                                    <td><section className={styles.reason}>Shared on {formatDate(articledata.uploadOn)}</section></td>
                                                    <td><section className={styles.owner}><div><img src={articledata.profile} alt="Profile" /></div>{articledata.email}</section></td>
                                                    <td><section className={styles.location}><div><Group /></div>Shared with me</section></td>
                                                </>}
                                                <td><button className={styles.menu} onClick={() => setShareinfo(articledata.key)}><MoreVert /></button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>}
                    </>}
                </>}
            </main>
            <ShareWith shareWithCont={shareWithCont} setShareWithCont={setShareWithCont} shareDocId={shareDocId} />
        </>
    );
}

export default Home;

// import { addDoc, getDocs, updateDoc, deleteDoc, collection, query, where, doc } from "firebase/firestore";
// import { auth, db } from '../../auth/firebase';

/*// Add new document with auto-gen doc ID
const addUser = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            uid: auth.currentUser.uid,
            name: "Alice",
            age: 25,
            createdAt: new Date()
        });
        console.log("User added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

const fetchUsers = async () => {
    try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const data = await getDocs(q);
        data.forEach((doc) => {
            console.log(`${doc.id} =>`, doc.data());
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

// it can update key and add key
const updateUser = async () => {
    const docRef = doc(db, "users", '88sSOD0OLxt8H4QSQ0kq');
    await updateDoc(docRef, {
        age: 30,
    });
};

const deleteUser = async () => {
    const docRef = doc(db, "users", 'wBd2BgcZlD9mVB2q6BG9');
    await deleteDoc(docRef);
};*/
import styles from './styles.module.css';
import Close from '../../assets/Close';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

import { getDocs, updateDoc, collection, query, where, doc, arrayUnion } from "firebase/firestore";
import { auth, db } from '../../auth/firebase';
import { toast } from 'react-toastify';

async function share(docid, uid){
    try{
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.error("No user found with uid:", uid);
            return;
        }

        const userDoc = snapshot.docs[0];
        const userDocId = userDoc.id;
        const docRef = doc(db, "users", userDocId);
        await updateDoc(docRef, {
            storage: arrayUnion({
                docid: docid,
                time: new Date()
            }),
        });

        toast.success('Shared successfully!');
    } catch (error) {
        console.error("Error updating file:", error);
        toast.error('Please try again later!');
    }
}

function ShareWith({ shareWithCont, setShareWithCont, shareDocId }) {
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const user = auth.currentUser;
                if (!user) return;
        
                const q = query(collection(db, "users"));
                const data = await getDocs(q);

                const users = data.docs.map((doc) => {
                    const userData = doc.data();
                    return {
                        uid: userData.uid,
                        name: userData.name,
                        profile: userData.profile,
                    };
                }).filter((u) => u.uid !== user.uid);

                setAllUsers(users);
            } catch (error) {
                console.error("Error:", error);
                toast.error('Please try again later!');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    },[])

    return (
        <div className={shareWithCont? `${styles.sharewith} ${styles.active}` : styles.sharewith}>
            <button className={styles.close} onClick={()=>setShareWithCont(!shareWithCont)}><Close /></button>
            <div className={styles.sharecont}>
                <h1>Share with</h1>
                {loading ? <Loader /> : <>
                    {allUsers.length > 0 ? <>
                        {allUsers.map((user) => {
                            return (
                                <section key={user.uid} className={styles.profilesection}>
                                    <div><img src={user.profile} alt='Profile Picture' /></div>
                                    <h2>{user.name}</h2>
                                    <button onClick={()=>{share(shareDocId, user.uid); setShareWithCont(!shareWithCont);}}>Share</button>
                                </section>
                            );
                        })}
                    </> : <>
                        <p>Sorry there are no users with you can share.</p>
                    </>}
                </>}
            </div>
        </div>
    );
}

export default ShareWith;
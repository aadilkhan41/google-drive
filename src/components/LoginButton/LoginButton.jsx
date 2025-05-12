import styles from './styles.module.css';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../../auth/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from 'react-toastify';

const addUser = async (userObj) => {
    try {
        await addDoc(collection(db, "users"), {
            uid: userObj.uid,
            name: userObj.name,
            email: userObj.email,
            profile: userObj.profile,
            createdAt: new Date(),
            storage: []
        });
    } catch (error) {
        console.error("Error adding user:", error);
        toast.error('Please try again later!');
    }
};

async function signInWithGoogle( navigate) {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const isNew = result._tokenResponse?.isNewUser
        const loginUser = result.user;

        if (loginUser) {
            if (isNew) {
                addUser({
                    uid: loginUser.uid,
                    name: loginUser.displayName,
                    email: loginUser.email,
                    profile: loginUser.photoURL,
                });
            }

            navigate('/', { replace: true });
        } else {
            throw new Error("Please try again letter");
        }
    } catch (error) {
        console.error("Google Sign-In Error:", error.message);
        toast.error('Please try again later!');
    }
}

function LoginButton() {
    const navigate = useNavigate();
    
    return (
        <button className={styles.login} onClick={()=>signInWithGoogle( navigate)}>Log In</button>
    );
}

export default LoginButton;
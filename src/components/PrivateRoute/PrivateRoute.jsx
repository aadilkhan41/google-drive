import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import Loader from '../Loader/Loader';
import { useEffect } from 'react';
import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateProp } from '../../redux/userSlice';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../../auth/firebase';

const fetchUser = async (userId, dispatch) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", userId));
        const data = await getDocs(q);
        const firstDoc = data.docs[0];
        const userData = firstDoc.data();

        dispatch(updateProp({propName: 'docid', data: firstDoc.id}));
        dispatch(updateProp({propName: 'uid', data: userData.uid}));
        dispatch(updateProp({propName: 'profile', data: userData.profile}));
        dispatch(updateProp({propName: 'name', data: userData.name}));
        dispatch(updateProp({propName: 'email', data: userData.email}));
    } catch (error) {
        console.error("Error:", error);
        toast.error('Please try again later!');
    }
};

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading } = useAuth();
    const userPro = useSelector((state) => state.userProfile.profile);

    useEffect(() => {
        if (!loading && user == null) {
            navigate('/login', { replace: true });
        }
    }, [user, loading, navigate]);

    if(user != null) fetchUser(user.uid, dispatch);
    if (loading || userPro === null) return <div className={styles.loading}><Loader /></div>;
    return <>{children}</>;
}

export default PrivateRoute;
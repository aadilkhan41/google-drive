import styles from "./styles.module.css";
import Sliders from '../../assets/sliders';
import { signOut } from 'firebase/auth';
import { auth } from '../../auth/firebase';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { sortByNameAsc, sortByNameDesc, sortByDateAsc, sortByDateDesc } from '../../redux/homeSlice';

function DropDown({ label }) {
    const dispatch = useDispatch();
    const [dropDown, setDropDown] = useState(false);
    const dropDownRef = useRef();
    const profileImage = useSelector((state) => state.userProfile.profile);

    useEffect(() => {
        function handelDropDown(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setDropDown(false);
            }
        }
        document.addEventListener('mousedown', handelDropDown);
        return () => document.removeEventListener('mousedown', handelDropDown);
    }, []);

    return (
        <div ref={dropDownRef} className={styles.dropDownCont}>
            {label === 'slider' ? <>
                <div className={styles.slidersCont}>
                    <button onClick={() => setDropDown(!dropDown)}><Sliders /></button>
                </div>
            </> : <>
                <button onClick={() => setDropDown(!dropDown)}>
                    <img src={profileImage} alt='Profile Picture' />
                </button>
            </>}
            <section className={dropDown ? `${styles.dropdown} ${styles.active}` : `${styles.dropdown}`}>
                {label === 'slider'? <>
                    <h4>Sort By</h4>
                    <ul className={styles.settings}>
                        <li onClick={()=>dispatch(sortByNameAsc())}>Name Ascending</li>
                        <li onClick={()=>dispatch(sortByNameDesc())}>Name Descending</li>
                        <li onClick={()=>dispatch(sortByDateAsc())}>Date Ascending</li>
                        <li onClick={()=>dispatch(sortByDateDesc())}>Date Descending</li>
                    </ul>
                </> : <>
                    {/* <h4>Theme</h4>
                    <ul className={styles.settings}>
                        <li>Light</li>
                        <li>Dark</li>
                        <li>System</li>
                    </ul> */}
                    <h4>My Account</h4>
                    <ul className={styles.settings}>
                        <li style={{color: 'red'}} onClick={() => signOut(auth)}>Log Out</li>
                    </ul>
                </>}
            </section>
        </div>
    );
}

export default DropDown;
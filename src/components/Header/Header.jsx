import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFiles } from '../../redux/homeSlice';

import DropDown from '../DropDown/DropDown';

import driveLogo from '/google-drive.png';
import OfflinePin from '../../assets/OfflinePin';
import Help from '../../assets/Help';
import Settings from '../../assets/Settings';
import Apps from '../../assets/Apps';
import Gemini from '../../assets/Gemini';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation()
    const dispatch = useDispatch();
    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(fetchFiles({ searchQuery: searchQuery}));
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(()=>{
        setSearchQuery('');
    }, [location])

    return (
        <header className={styles.header}>
            <div className={styles.searchCont}>
                <div className={styles.logo}>
                    <img src={driveLogo} alt="drive logo" />
                    <p>Drive</p>
                </div>
                <div className={styles.searchBar}>
                    <input type="text" onChange={(event) => setSearchQuery(event.target.value)} value={searchQuery} placeholder='Search in Drive'/>
                    <DropDown label='slider' />
                </div>
            </div>
            <nav>
                <button><OfflinePin /></button>
                <button><Help /></button>
                <button><Settings /></button>
                <button className={styles.gemini}><Gemini /></button>
                <button><Apps /></button>
                <DropDown label='profile' />
            </nav>
        </header>
    );
}

export default Header;
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

import Article from '../../components/Article/Article';
import RenderIcon from '../../components/RenderIcon/RenderIcon';
import NoData from '../../components/NoData/NoData';
import Loader from '../../components/Loader/Loader';

import { auth } from '../../auth/firebase';
import { formatDate } from '../../functions/function';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../../redux/homeSlice';

import Dehaze from '../../assets/Dehaze';
import GridView from '../../assets/GridView';
import MoreVert from '../../assets/MoreVert';

function Shared() {
    const [layout, setLayout] = useState(true);
    const dispatch = useDispatch();
    const { tableRows, loading, error } = useSelector((state) => state.homeStorage);
    useEffect(() => {
        dispatch(fetchFiles());
    }, []);

    return (
        <main className={styles.main}>
            <header className={styles.headOption}>
                <section>
                    <h1>Shared with me</h1>
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
                                if(articledata.uid === auth.currentUser.uid) return null;
                                return (<Article key={articledata.key} label='shared' articledata={articledata} />);
                            })}
                        </main>
                    </> : <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Shared by</th>
                                    <th>Share date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((articledata) => {
                                    if(articledata.uid === auth.currentUser.uid) return null;
                                    return (
                                        <tr key={articledata.key}>
                                            <td><section className={styles.name}><div><RenderIcon fileType={articledata.type} /></div>{articledata.name}</section></td>
                                            <td><section className={styles.owner}><div><img src={articledata.profile} alt="Profile" /></div>{articledata.email}</section></td>
                                            <td><section className={styles.reason}>Shared on {formatDate(articledata.uploadOn)}</section></td>
                                            <td><button className={styles.menu}><MoreVert /></button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>}
                </>}
            </>}
        </main>
    );
}

export default Shared;
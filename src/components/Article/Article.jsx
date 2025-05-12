import styles from './styles.module.css';
import RenderIcon from '../RenderIcon/RenderIcon';
import { auth } from '../../auth/firebase';
import { formatDate } from '../../functions/function';
import Group from '../../assets/Group';
import MoreVert from '../../assets/MoreVert';

function Article({ label, articledata, setShareinfo }) {
    return (
        <article className={styles.article}>
            <section className={styles.head}>
                <div><RenderIcon fileType={articledata.type} /></div>
                <p>{articledata.name}</p>
                {label === 'home' ? <button onClick={()=>setShareinfo(articledata.key)}><Group/></button> : <>
                    <button><MoreVert/></button>
                </>}
            </section>
            {articledata.type === 'img' ? <>
                <section className={styles.imgCont}>
                    <a href={articledata.file} target="_blank" download><img src={articledata.file} alt="Drive Image"/></a>
                </section>
            </> : articledata.type === 'video' ? <>
                <section className={styles.imgCont}>
                <a href={articledata.file} target="_blank" download><video src={articledata.file}></video></a>
                </section>
            </> : <>
                <section className={styles.imglogo}>
                <a href={articledata.file} target="_blank" download><RenderIcon fileType={articledata.type} /></a>
                </section>
            </>}
            {label === 'home' ? <>
                <section className={styles.foot}>
                    <div>
                        <img src={articledata.profile} alt="Profile Image"/>
                    </div>
                    {articledata.uid === auth.currentUser.uid ? <>
                        <p>You uploaded on {formatDate(articledata.uploadOn)}</p>
                    </> : <>
                        <p>Shared on {formatDate(articledata.uploadOn)}</p>
                    </>}
                </section>
            </> : <></>}
        </article>
    );
}

export default Article;
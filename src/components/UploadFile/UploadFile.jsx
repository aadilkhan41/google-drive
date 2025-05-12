import ArrowDown from '../../assets/ArrowDown';
import styles from './styles.module.css';
import RenderIcon from '../../components/RenderIcon/RenderIcon';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function UploadFile() {
    const [minimize, setMinimize] = useState(false);
    const fileObj = useSelector((state) => state.uploader);

    return (<>
        {fileObj.percentage != null && fileObj.percentage < 100 ?
            <div className={minimize ? `${styles.active} ${styles.uploadFile}` : `${styles.uploadFile}`}>
                <header>
                    <h2>Uploading item</h2>
                    <button onClick={() => setMinimize(!minimize)}><ArrowDown /></button>
                </header>
                <section>
                    <div>
                        <div><RenderIcon fileType={fileObj.fileType} /></div>
                        <p>{fileObj.file}</p>
                    </div>
                    <progress className={styles.progress} value={fileObj.percentage} max="100"></progress>
                </section>
            </div> : ''}
        </>);
}

export default UploadFile;
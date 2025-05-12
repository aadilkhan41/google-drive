import styles from './styles.module.css';
import NoFiles from '../../assets/NoFiles';

function NoData() {
    return (
        <section className={styles.nodata}>
            <NoFiles/>
            <h1>Welcome to Drive, the home for all your files</h1>
            <p>Use the “New” button to upload</p>
        </section>
    );
}

export default NoData;
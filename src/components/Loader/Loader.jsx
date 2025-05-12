import styles from "./styles.module.css";

function Loader(){
    return (
    <div className={styles.loader}>
        <div>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>);
}

export default Loader;
import styles from './styles.module.css';
import driveLogo from '/google-drive.png';
import LoginButton from '../LoginButton/LoginButton';

function LoginHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={driveLogo} alt="drive logo" />
                <p>Google Drive</p>
            </div>
            <LoginButton />
        </header>
    );
}

export default LoginHeader;
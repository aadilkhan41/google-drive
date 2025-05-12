import styles from './styles.module.css';
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import profileSticker from '/landing-splash.jpg';
import LoginButton from '../../components/LoginButton/LoginButton';

function Login() {
    return (
        <>
            <LoginHeader />
            <main className={styles.main}>
                <div>
                    <section className={styles.details}>
                        <h1>Easy and secure access to your content</h1>
                        <p>
                            <strong>Access your files anytime, anywhere — from mobile, tablet, or desktop. </strong>
                            Securely store documents, photos, and more in the cloud. Share effortlessly and collaborate in real-time with others using Google Drive.
                        </p>
                        <span><LoginButton /></span>
                    </section>
                    <section className={styles.sticker}>
                        <img src={profileSticker} alt="Aadil's Profile" />
                    </section>
                </div>
            </main>
        </>
    );
}

export default Login;
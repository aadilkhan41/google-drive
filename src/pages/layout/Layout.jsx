import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';
import { Outlet } from 'react-router-dom';
import UploadFile from '../../components/UploadFile/UploadFile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationMobile from '../../components/NavigationMobile/NavigationMobile';
import { useRef } from 'react';

function Layout() {
    const addButtonRef = useRef(null);

    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.outlet}>
                <div>
                    <Aside addButtonRef={addButtonRef} />
                </div>
                <Outlet />
                <NavigationMobile addButtonRef={addButtonRef}/>
                <UploadFile />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </div>);
}

export default Layout;
import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomeIcon from '../../assets/HomeIcon';
import MyDrive from '../../assets/MyDrive';
import Add from '../../assets/Add';
import Devices from '../../assets/Devices';
import Group from '../../assets/Group';

const options = [
    {
        key: 0,
        label: 'Home',
        link: '/',
        Icon: <HomeIcon />,
    }, {
        key: 1,
        label: 'MyDrive',
        link: null,
        Icon: <MyDrive />,
    }, {
        key: 2,
        label: 'Create',
        link: null,
        Icon: <Add />,
    }, {
        key: 3,
        label: 'Devices',
        link: null,
        Icon: <Devices />,
    }, {
        key: 4,
        label: 'Shared',
        link: '/shared',
        Icon: <Group />,
    }
];

function NavigationMobile({ addButtonRef }) {
    const location = useLocation().pathname;
    const [active, setActive] = useState(location);
    
    useEffect(()=>{
        setActive(location);
    },[location]);

    function linkOnClick(link, label){
        if(link != null){
            setActive(link);
        }else if(label=='Create'){
            addButtonRef.current.click();
        }
    }

    return (
        <nav className={styles.nav}>
            {options.map((option) => {
                return (
                    <Link key={option.key} className={active == option.link ? styles.active : ''} to={option.link} onClick={()=>linkOnClick(option.link, option.label)}>
                        <i>{option.Icon}</i>
                        <label>{option.label}</label>
                    </Link>
                );
            })}
        </nav>
    );
}

export default NavigationMobile;
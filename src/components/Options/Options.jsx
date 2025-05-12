import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomeIcon from '../../assets/HomeIcon';
import MyDrive from '../../assets/MyDrive';
import Devices from '../../assets/Devices';
import Group from '../../assets/Group';
import Schedule from '../../assets/Schedule';
import Star from '../../assets/Star';
import Report from '../../assets/Report';
import Delete from '../../assets/Delete';
import Cloud from '../../assets/Cloud';

const option1 = [
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
        label: 'Computers',
        link: null,
        Icon: <Devices />,
    }
];

const option2 = [
    {
        key: 4,
        label: 'Shared with me',
        link: '/shared',
        Icon: <Group />,
    }, {
        key: 5,
        label: 'Recent',
        link: null,
        Icon: <Schedule />,
    }, {
        key: 6,
        label: 'Create',
        link: null,
        Icon: <Star />,
    }
];

const option3 = [
    {
        key: 7,
        label: 'Spam',
        link: null,
        Icon: <Report />,
    }, {
        key: 8,
        label: 'Bin',
        link: null,
        Icon: <Delete />,
    }, {
        key: 9,
        label: 'Storage',
        link: null,
        Icon: <Cloud />,
    }
];

function Options(){
    const location = useLocation().pathname;
    const [active, setActive] = useState(location);

    useEffect(() => {
        setActive(location);
    }, [location]);

    function options(options) {
        return options.map((option) => {
            if (option.link === null) return (
                <li key={option.key}>
                    {option.Icon}{option.label}
                </li>
            )
            return (
                <li key={option.key} className={active == option.link ? styles.active : ''}><Link to={option.link} onClick={() => setActive(option.link)}>
                    {option.Icon}{option.label}</Link>
                </li>
            );
        });
    }

    return (<>
            <ul className={styles.ul}>{options(option1)}</ul>
            <ul className={styles.ul}>{options(option2)}</ul>
            <ul className={styles.ul}>{options(option3)}</ul>
    </>);
}

export default Options;
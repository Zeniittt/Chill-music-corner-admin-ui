import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faMusic } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import logo from '~/assets/imgs/logothk.png';

const cx = classNames.bind(styles);

const navItems = [
    { icon: faUser, name: 'user', to: '/user' },
    { icon: faMusic, name: 'advertisement', to: '/advertisement' },
    { icon: faGear, name: 'log-out', to: '/' },
];

function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <a href="/home">
                <div className={cx('header-sidebar')}>
                    <h3>THK Music</h3>
                    <div className={cx('logo-wrapper')}>
                        <img className={cx('logo')} src={logo} alt="THK Music" />
                    </div>
                </div>
            </a>
            <ul className={cx('nav-list')}>
                {navItems.map(({ icon, name, to }, index) => (
                    <a href={to}>
                        <div className={cx('nav-item-container')}>
                            <li key={index} className={cx('nav-item')}>
                                <FontAwesomeIcon icon={icon} className={cx('icon-item')} />
                                {name}
                            </li>
                        </div>
                    </a>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;

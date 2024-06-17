import config from '~/config';

import Menu, { MenuItem } from './Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faGear,
    faMusic,
    faAd,
    faMicrophone,
    faHeadphones,
    faCompactDisc,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import logo from '~/assets/imgs/logothk.png';

const cx = classNames.bind(styles);

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
            <aside className={cx('wrapper')}>
                <Menu>
                    <MenuItem title="User" to={config.routes.user} icon={<FontAwesomeIcon icon={faUser} />} />
                    <MenuItem title="Song" to={config.routes.song} icon={<FontAwesomeIcon icon={faMusic} />} />
                    <MenuItem title="Artist" to={config.routes.artist} icon={<FontAwesomeIcon icon={faMicrophone} />} />
                    <MenuItem title="Genre" to={config.routes.genre} icon={<FontAwesomeIcon icon={faHeadphones} />} />
                    <MenuItem title="Album" to={config.routes.album} icon={<FontAwesomeIcon icon={faCompactDisc} />} />
                    {/* <MenuItem
                        title="Notification"
                        to={config.routes.notification}
                        icon={<FontAwesomeIcon icon={faBell} />}
                    /> */}
                    <MenuItem title="Banner" to={config.routes.banner} icon={<FontAwesomeIcon icon={faAd} />} />
                    <MenuItem title="Log-out" to={config.routes.logout} icon={<FontAwesomeIcon icon={faGear} />} />
                </Menu>
            </aside>
        </div>
    );
}

export default Sidebar;

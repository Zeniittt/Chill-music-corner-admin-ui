import config from '~/config';

import Menu, { MenuItem } from './Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faMusic } from '@fortawesome/free-solid-svg-icons';
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
                    <MenuItem
                        title="Marketing"
                        to={config.routes.marketing}
                        icon={<FontAwesomeIcon icon={faMusic} />}
                    />
                    <MenuItem title="Log-out" to={config.routes.logout} icon={<FontAwesomeIcon icon={faGear} />} />
                </Menu>
            </aside>
        </div>
    );
}

export default Sidebar;

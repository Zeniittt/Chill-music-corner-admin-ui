import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const handleLogout = () => {
        // Thực hiện logic đăng xuất tại đây
        // Ví dụ: xóa token khỏi localStorage hoặc cookie
        localStorage.removeItem('token'); // Giả sử bạn lưu token ở localStorage
        // Chuyển hướng người dùng đến trang đăng nhập
        navigate('/');
    };

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

                    <button className={cx('button')} onClick={handleLogout}>
                        <MenuItem title="Log-out" to={config.routes.main} icon={<FontAwesomeIcon icon={faGear} />} />
                    </button>
                </Menu>
            </aside>
        </div>
    );
}

export default Sidebar;

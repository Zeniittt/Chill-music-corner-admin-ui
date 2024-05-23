import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Notification() {
    return (
        <div className={cx('title')}>
            <h3 className={cx('text-title')}>{<FontAwesomeIcon icon={faBell} />} Notification</h3>
        </div>
    );
}

export default Notification;

import classNames from 'classnames/bind';
import styles from './Marketing.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Marketing() {
    return (
        <div className={cx('title')}>
            <h3 className={cx('text-title')}>{<FontAwesomeIcon icon={faMusic} />} Marketing</h3>
        </div>
    );
}

export default Marketing;
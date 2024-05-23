import classNames from 'classnames/bind';
import styles from './Album.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Album() {
    return (
        <div className={cx('title')}>
            <h3 className={cx('text-title')}>{<FontAwesomeIcon icon={faCompactDisc} />} Album</h3>
        </div>
    );
}

export default Album;

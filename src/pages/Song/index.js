import classNames from 'classnames/bind';
import styles from './Song.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Song() {
    return (
        <div className={cx('title')}>
            <h3 className={cx('text-title')}>{<FontAwesomeIcon icon={faMusic} />} Song</h3>
        </div>
    );
}

export default Song;

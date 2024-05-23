import classNames from 'classnames/bind';
import styles from './Artist.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Artist() {
    return (
        <div className={cx('title')}>
            <h3 className={cx('text-title')}>{<FontAwesomeIcon icon={faMicrophone} />} Artist</h3>
        </div>
    );
}

export default Artist;

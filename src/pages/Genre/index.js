import classNames from 'classnames/bind';
import styles from './Genre.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Genre() {
    return (
        <div className={cx('title')}>
            <h3 className={cx('text-title')}>{<FontAwesomeIcon icon={faHeadphones} />} Genre</h3>
        </div>
    );
}

export default Genre;

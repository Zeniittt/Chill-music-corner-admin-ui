import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <h1>Welcome to THK Music 🩵</h1>
        </header>
    );
}

export default Header;

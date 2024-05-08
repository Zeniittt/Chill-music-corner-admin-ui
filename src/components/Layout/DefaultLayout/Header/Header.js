import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <h1>Chào mừng bạn đến với THK Ngoolxn ♥</h1>
        </header>
    );
}

export default Header;

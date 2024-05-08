import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import ProTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.proTypes = {
    title: ProTypes.string.isRequired,
    to: ProTypes.string.isRequired,
    icon: ProTypes.node.isRequired,
};

export default MenuItem;

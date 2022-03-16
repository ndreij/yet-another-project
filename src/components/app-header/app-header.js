import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { Link, NavLink } from 'react-router-dom'

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.nav}>
                    <li>
                        <NavLink exact to='/' className={styles.login} activeClassName={styles.activepane}>
                            <BurgerIcon type="secondary" />
                            <span className="text text_type_main-default pl-4">Конструктор</span>
                        </NavLink>
                    </li>
                    <li className="pl-5">
                        <NavLink to='/orders' className={styles.login} activeClassName={styles.activepane}>
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default pl-4">Лента заказов</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Link to="/">
                <Logo className="p-5" />
            </Link>
            <NavLink to='/profile' className={styles.login} activeClassName={styles.activepane}>
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default pl-4">Личный кабинет   </span>
            </NavLink>


        </header>
    );
}

export default AppHeader
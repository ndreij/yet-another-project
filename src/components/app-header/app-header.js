import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

function AppHeader() {
    return (
          <header className={styles.header}>
            <nav>
            <ul className={styles.nav}>
                <li>
                    <BurgerIcon type="primary" />
                    <span className="text text_type_main-default pl-4">Конструктор</span>
                </li>
                <li className="pl-5"> 
                    <ListIcon type="secondary" />
                    <span className="text text_type_main-default pl-4">Лента заказов</span>
                </li>
                </ul>
                </nav>
                <Logo className="p-5"/>
                <span className={styles.login}> 
                <ProfileIcon type="secondary" />
                    <span className="text text_type_main-default pl-4">Личный кабинет   </span>
                </span>


        </header>
    );
  }

export default AppHeader
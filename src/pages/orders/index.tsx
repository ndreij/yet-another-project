import { useMemo } from 'react'
import styles from '../pages.module.css'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../services/actions'
import { useSelector, useDispatch } from '../../services/hooks';
import { OrdersList } from '../../components/orders-list';

export function OrdersPage() {

    const { orders } = useSelector((state) => state.feed);
 
    const ordersMine = useMemo(() => orders?.filter((order) => order._isOwn) || null, [orders]);

    const dispatch = useDispatch();

    return (
        <>
            <div className={styles.contentwrapper2}>
                <div className={styles.contentwrapper}>
                    <div className={styles.links}>
                        <NavLink to='/profile' className={styles.link}>Профиль</NavLink>
                        <NavLink to='/profile/orders' className={styles.link} activeClassName={styles.activepane}>История заказов</NavLink>
                        <Link to='/' className={styles.link} onClick={() => dispatch(logout())}>Выход</Link>
                        <div className={styles.caption}>
                            В этом разделе вы можете изменить свои персональные данные
                        </div>
                    </div>

                    <div className={styles.orderscontent}>
                        
                        <OrdersList orders={ordersMine} showOrderStatus={true} />

                    </div>

                </div>
            </div>
        </>
    )
}
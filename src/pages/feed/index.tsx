import { useMemo } from 'react'
import styles from '../pages.module.css'
import { useSelector } from '../../services/hooks';
import { OrdersList } from '../../components/orders-list';

export function FeedPage() {

    const { total, totalToday, orders } = useSelector((state) => state.feed);

    const maxOrdersInFeed = 10;

    const ordersOther = useMemo(() => orders?.filter((order) => !order._isOwn) || null, [orders]);
    const ordersDone = useMemo(() => ordersOther?.filter((order) => order.status === 'done').slice(0, maxOrdersInFeed).map((order) => order.number) || [], [ordersOther]);
    const ordersInProgress = useMemo(() => ordersOther?.filter((order) => order.status === 'pending').slice(0, maxOrdersInFeed).map((order) => order.number) || [], [ordersOther]);

        return (
            <>
                <div className={styles.contentwrapper2}>
                    <div className={styles.contentwrapper}>

                        <div className={styles.column}>
                            <h2 className="text text_type_main-large pb-5">Лента заказов</h2>
                            
                            <OrdersList orders={ordersOther} showOrderStatus={false} />

                        </div>

                        <div className={styles.orderstats}>
                            <div className={styles.orderstatsboxhorisontal}>
                                <div className={styles.orderstatsbox2}>
                                    <h4>Готовы:</h4>

                                    {ordersDone.length <= 5 ?
                                        ordersDone.map((orderNumber) => (
                                            <p key={orderNumber}>{orderNumber}</p>
                                        ))
                                        :
                                        <div className={styles.ordersdonecolumns}>
                                            <div>
                                                {ordersDone.slice(0, 5).map((orderNumber) => (
                                                    <p key={orderNumber}>{orderNumber}</p>
                                                ))}
                                            </div>
                                            <div>
                                                {ordersDone.slice(5).map((orderNumber) => (
                                                    <p key={orderNumber}>{orderNumber}</p>
                                                ))}
                                            </div>
                                        </div>

                                    }

                                </div>
                                <div className={styles.orderstatsbox}>
                                    <h4>В работе:</h4>

                                    {ordersInProgress.map((orderNumber) => (
                                        <p key={orderNumber}>{orderNumber}</p>
                                    ))}

                                    {ordersInProgress.length === 0 && (<p className={styles.dimmed}>Заказов в работе нет</p>)}

                                </div>
                            </div>
                            <div className={styles.orderstatsbox}>
                                <h4>Выполнено за все время:</h4>
                                <p className={styles.bignumber}>{total}</p>
                            </div>
                            <div className={styles.orderstatsbox}>
                                <h4>Выполнено за сегодня:</h4>
                                <p className={styles.bignumber}>{totalToday}</p>
                            </div>

                        </div>

                    </div>
                </div>
            </>

        )
    
}
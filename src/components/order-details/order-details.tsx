import styles from './order-details.module.css'
import {
    CheckMarkIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import { useSelector } from 'react-redux';
 

function OrderDetails() {

    const { orderNumber, orderRequest } = useSelector((state: any) => state.miscList);

    return (
            <div className={styles.orderdetails}>
                {orderRequest 
                ? 
                <div className={styles.spinnercontainer}>
                <svg className={styles.upper} width="30%"  viewBox="0 0 276 276" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <g id="spinner">
                        <circle cx="138" cy="138" r="120" stroke="#7028B6" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="360 200" style={{animationDuration:5+"s"}}/>
                    </g>
                </svg>
                </div>
                : <>
                <p className="text text_type_digits-large pt-10">{orderNumber}</p>
                <p className="text text_type_main-medium pb-10">идентификатор заказа</p>
                <CheckMarkIcon type="primary" />
                <p className="text text_type_main-default pt-10">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на обитальной станции</p></>}
            </div>
    )
}

export default OrderDetails
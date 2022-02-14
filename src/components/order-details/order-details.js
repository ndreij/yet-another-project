import styles from './order-details.module.css'
import {
    CheckMarkIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function OrderDetails() {

    return (
            <div className={styles.orderdetails}>
                <p className="text text_type_digits-large pt-20">1234</p>
                <p className="text text_type_main-default pb-10">идентификатор заказа</p>
                <CheckMarkIcon type="primary" />
                <p className="text text_type_main-small pt-10">Ваш заказ начали готовить</p>
                <p className="text text_type_main-small text_color_inactive pt-2">Дождитесь готовности на обитальной станции</p>
            </div>
    )
}

export default OrderDetails
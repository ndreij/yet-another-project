
import styles from './modal-header.module.css'
import {
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import {HIDE_MODAL} from '../../services/actions'
import {useDispatch} from 'react-redux'

function ModalHeader(props) {

    const dispatch = useDispatch()

    return (
        <div className={styles.modalheader} >
            <p className="text text_type_main-large">{props.children}</p>
            <CloseIcon type="primary" onClick={() => dispatch({type: HIDE_MODAL})} />
        </div>
    )
}


export default ModalHeader
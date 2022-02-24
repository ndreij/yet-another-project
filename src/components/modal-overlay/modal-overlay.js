import styles from './modal-overlay.module.css'
import React from 'react';
import {useDispatch} from 'react-redux'
import {HIDE_MODAL} from '../../services/actions'

function ModalOverlay (props) {

    const dispatch = useDispatch()

    return (
        <div className={styles.modaloverlay} onClick={() => dispatch({type: HIDE_MODAL})} >
        </div>
    )
}


export default ModalOverlay
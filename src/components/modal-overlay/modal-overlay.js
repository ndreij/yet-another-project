import styles from './modal-overlay.module.css'
import React from 'react';
import {useDispatch} from 'react-redux'
import {HIDE_MODAL} from '../../services/actions'

function ModalOverlay (props) {

    const dispatch = useDispatch()

    return (
        <div className={styles.modaloverlay} onClick={() => props.onClose()} >
        </div>
    )
}


export default ModalOverlay
import styles from './modal-overlay.module.css'
import React from 'react';
import { FC } from 'react';

interface modalOverlayProps {
    onClose: Function
}

export const ModalOverlay: FC<modalOverlayProps> = (props) => {

    return (
        <div className={styles.modaloverlay} onClick={() => props.onClose()} >
        </div>
    )
}


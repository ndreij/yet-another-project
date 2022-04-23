
import styles from './modal-header.module.css'
import {
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';

interface modalHeaderProps {
    onClose: Function
}

export const ModalHeader: FC<modalHeaderProps> = (props) => {

    return (
        <div className={styles.modalheader} >
            <p className="text text_type_main-large">{props.children}</p>
            <div className={styles.modalheaderclose}> 
            <CloseIcon type="primary" onClick={() => props.onClose()} />
            </div>
        </div>
    )
}
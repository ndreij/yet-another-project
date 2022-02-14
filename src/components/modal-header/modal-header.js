
import styles from './modal-header.module.css'
import {
    CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import PropTypes from 'prop-types';

function ModalHeader(props) {
    return (
        <div className={styles.modalheader} >
            <p className="text text_type_main-default">{props.children}</p>
            <CloseIcon type="primary" onClick={() => props.setModalState({ visible: false })} />
        </div>
    )
}

ModalHeader.propTypes = {
    setModalState: PropTypes.func.isRequired,
}

export default ModalHeader
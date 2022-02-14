import styles from './modal-overlay.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function ModalOverlay (props) {

    return (
        <div className={styles.modaloverlay} onClick={() => props.setModalState({visible: false})}>
        </div>
    )
}

ModalOverlay.propTypes = {
    setModalState: PropTypes.func.isRequired,
  }

export default ModalOverlay
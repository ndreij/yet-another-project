import styles from './modal-overlay.module.css'
import React from 'react';
import PropTypes from 'prop-types';

function ModalOverlay (props) {

    return (
        <div className={styles.modaloverlay} onClick={() => props.onClose()} >
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
  }

export default ModalOverlay


import styles from './modal.module.css'
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay.js'
import ModalHeader from '../modal-header/modal-header.js'

const modalRoot = document.getElementById("react-modals");

function Modal(props) {

  const handleCloseByEsc = (event) => {
    if (event.keyCode === 27) {
      return props.setModalState({ visible: false })
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleCloseByEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseByEsc);
    };
  }, [handleCloseByEsc]);

  return ReactDOM.createPortal(
    <>
      <div id="modal">
        <ModalOverlay setModalState={props.setModalState} />
        <div className={styles.modal}>
          <div className={styles.modalcontent} >
            <ModalHeader setModalState={props.setModalState}>{props.header}</ModalHeader>
            {props.children}
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  setModalState: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
}

export default Modal
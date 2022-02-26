import styles from './modal.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay.js'
import ModalHeader from '../modal-header/modal-header.js'

const modalRoot = document.getElementById("react-modals");

function Modal(props) {

  const onClose = props.onClose;

  const handleCloseByEsc = (event) => {
    if (event.key === 'Escape') {
      return onClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleCloseByEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseByEsc);
    };
  });

  return ReactDOM.createPortal(
      <>
        <ModalOverlay onClose={onClose}/>
        <div className={styles.modal}>
          <div className={styles.modalcontent} >
            <ModalHeader onClose={onClose}>{props.header}</ModalHeader>
            {props.children}
          </div>
        </div>
      </>,
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default Modal


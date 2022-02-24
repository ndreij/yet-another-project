import styles from './modal.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay.js'
import ModalHeader from '../modal-header/modal-header.js'
import {HIDE_MODAL} from '../../services/actions'
import {useDispatch} from 'react-redux'

const modalRoot = document.getElementById("react-modals");

function Modal(props) {

 const dispatch = useDispatch()

  const handleCloseByEsc = (event) => {
    if (event.key === 'Escape') {
      return dispatch({type: HIDE_MODAL})
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
        <ModalOverlay/>
        <div className={styles.modal}>
          <div className={styles.modalcontent} >
            <ModalHeader>{props.header}</ModalHeader>
            {props.children}
          </div>
        </div>
      </>,
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.string,
}

export default Modal
import styles from './modal.module.css'
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay'
import { ModalHeader } from '../modal-header/modal-header'

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface modalProps {
  header: string,
  onClose: Function
}

export const Modal: FC<modalProps> = (props) => {

  const onClose = props.onClose;

  const handleCloseByEsc = (event: KeyboardEvent) => {
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


import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './Modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverLay from "../ModalOverLay/ModalOverLay";
import { FC, ReactNode } from "react";

interface IModalProps {
  isOpen: boolean,
  children: ReactNode,
  onClose: () => void,
  height: string
}


const modalRoot = document.getElementById("react-modals") as Element | DocumentFragment

const Modal: FC<IModalProps> = ({ isOpen, children, onClose, height }) => {

  function closePopup() {
    setAnimation('fadeOut')
    setTimeout(() => {
      setAnimation('fadeIn')
      onClose()
    }, 400)

  }

  React.useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        closePopup()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  const [animation, setAnimation] = React.useState('fadeIn');

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverLay
      closePopup={closePopup}
      animation={animation}
    >
      <div className={modal.container} style={{ height: height }}>
        {children}
        <button onClick={closePopup}
          className={modal.closeBtn}>
          <CloseIcon type="primary" /></button>
      </div>

    </ModalOverLay>
    , modalRoot
  );

}

export default Modal;

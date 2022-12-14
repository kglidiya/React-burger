import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './Modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverLay from "../ModalOverLay/ModalOverLay";
import PropTypes from 'prop-types';



Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired
};

const modalRoot = document.getElementById("react-modals");

function Modal({ isOpen, children, onClose, height }) {

  function closePopup() {
    setAnimation('fadeOut')
    setTimeout(() => {
      setAnimation('fadeIn')
      onClose()
  
    }, 400)
    
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
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
      isOpen={isOpen}
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

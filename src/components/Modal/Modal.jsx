import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './modal.module.css';
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

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        setAnimation('fadeOut')
        setTimeout(() => {
          setAnimation('fadeIn')
          onClose()
        }, 300)
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
      onClick={onClose}
      isOpen={isOpen}
      animation={animation}
      setAnimation={setAnimation}
    >
      <div className={modal.container} style={{ height: height }}>
        {children}
        <button onClick={() => {
          setAnimation('fadeOut')
          setTimeout(() => {
            setAnimation('fadeIn')
            onClose()
          }, 400)
        }}
          className={modal.closeBtn}>
          <CloseIcon type="primary" /></button>
      </div>
    </ModalOverLay>
    , modalRoot
  );

}

export default Modal;

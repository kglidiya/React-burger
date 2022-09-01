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

  if (!isOpen) return null;

  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      onClose()
    }
  }

  document.addEventListener('keydown', closeByEscape);

  return ReactDOM.createPortal(
    <>
      <ModalOverLay onClick={onClose}>
        <div className={modal.container} style={{ height: height }}>
          {children}
          <button onClick={onClose} className={modal.closeBtn}> <CloseIcon type="primary" /></button>
        </div>
      </ModalOverLay>
    </>, modalRoot
  );

}

export default Modal;

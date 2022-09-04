import overlayStyles from './overlay.module.css';
import PropTypes from 'prop-types';

ModalOverLay.propTypes = {
    children: PropTypes.element.isRequired,
    closePopup: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    animation: PropTypes.string.isRequired,
};

function ModalOverLay({ children, closePopup, animation }) {

    return (
        <div onClick={(e) => {
            if (e.target === e.currentTarget) {
                closePopup()
            }
        }} className={`${overlayStyles.overlay} ${overlayStyles[animation]}`}
        >{children}</div>
    )
}

export default ModalOverLay;
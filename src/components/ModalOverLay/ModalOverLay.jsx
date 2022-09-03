import overlayStyles from './overlay.module.css';
import PropTypes from 'prop-types';

ModalOverLay.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    animation: PropTypes.string.isRequired,
    setAnimation: PropTypes.func.isRequired
};

function ModalOverLay({ children, onClick, animation, setAnimation }) {

    return (
        <div onClick={(e) => {
            if (e.target === e.currentTarget) {
                setAnimation('fadeOut')
                setTimeout(() => {
                    setAnimation('fadeIn')
                    onClick()
                }, 400)

            }
        }} className={`${overlayStyles.overlay} ${overlayStyles[animation]}`}
        >{children}</div>
    )
}

export default ModalOverLay;
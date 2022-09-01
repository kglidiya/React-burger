import overlayStyles from './overlay.module.css';
import PropTypes from 'prop-types';

ModalOverLay.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
};

function ModalOverLay({ children, onClick}) {

    return (
        <>
            <div onClick={onClick} className={overlayStyles.overlay}>{children}</div>
        </>
    )
}

export default ModalOverLay;
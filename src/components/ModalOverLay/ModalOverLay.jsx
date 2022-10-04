import overlayStyles from './Overlay.module.css';
import PropTypes from 'prop-types';
import {deleteCurrentIngredient} from '../../services/actions'
import { useDispatch, } from 'react-redux';

ModalOverLay.propTypes = {
    children: PropTypes.element.isRequired,
    closePopup: PropTypes.func.isRequired,
    animation: PropTypes.string.isRequired,
};

function ModalOverLay({ children, closePopup, animation }) {
    const dispatch = useDispatch();
    

    return (
        <div onClick={(e) => {
            if (e.target === e.currentTarget) {
                closePopup()
                dispatch(deleteCurrentIngredient())
            }
        }} className={`${overlayStyles.overlay} ${overlayStyles[animation]}`}
        >{children}</div>
    )
}

export default ModalOverLay;
import overlayStyles from './Overlay.module.css';
import { FC, ReactNode } from "react";

interface IModalOverLayProps {
    children: ReactNode,
    closePopup: () => void,
    animation: string,
}


const ModalOverLay: FC<IModalOverLayProps> = ({ children, closePopup, animation }) => {

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
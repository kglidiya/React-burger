import orderDetailsStyles from './order.module.css';
import icon from '../../images/done.svg';
import React from 'react';


function OrderDetails() {

    const orderNumber = '034536';
    
    React.useEffect(function saveFormToLocalStorage() { localStorage.setItem('oderId', orderNumber); });

    return (
        <>
            <div className={orderDetailsStyles.container}>
                <p className={`${orderDetailsStyles.title} text text_type_digits-large`}>{orderNumber}</p>
                <p className="text text_type_main-medium mt-5 pt-3">идентификатор заказа</p>
                <img src={icon} alt="Иконка" className={orderDetailsStyles.icon} />
                <p className="text text_type_main-small mt-5 mb-3">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        </>

    )
}

export default OrderDetails;
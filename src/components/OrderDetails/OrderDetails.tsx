import orderDetailsStyles from './Order.module.css';
import icon from '../../images/done.svg';
import { useSelector } from '../../services/hooks/hooks';


function OrderDetails() {

    const orderNumber = useSelector((state) => state.orderReducer.orderNumber);

    return (
        <div className={orderDetailsStyles.container}>
            <p className={`${orderDetailsStyles.title} text text_type_digits-large`}>{orderNumber}</p>
            <p className="text text_type_main-medium mt-5 pt-3">идентификатор заказа</p>
            <img src={icon} alt="Иконка" className={orderDetailsStyles.icon} />
            <p className="text text_type_main-small mt-5 mb-3">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;
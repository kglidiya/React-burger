import OrderStyles from './CurrentOrder.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDate } from '../../utils/date';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function CurrentOrder({ ingredients, counts, price }) {
    const orders = useSelector((state) => state.wsReducer.orders.orders);
    const { id } = useParams()
    const order = orders.filter(el => el._id === id)[0]


    return (
        <>
            <div className={OrderStyles.main}>
                <p className={`${OrderStyles.text} text text_type_digits-default `}>{`#${order.number}`}</p>
                <h4 className="text text_type_main-medium">{order.name}</h4>
                <p className={`${OrderStyles.color} text text_type_main-default`}>{order.status === 'done' ? "Выполнен" : "В приготовлении"}</p>
                <p className="text text_type_main-medium mb-3">Состав:</p>
                <div className={OrderStyles.scroll}>
                    {ingredients.map((el) => {
                        for (let item in counts) {
                            if (el._id === item) {
                                return (
                                    <div key={el._id} className={OrderStyles.container}>
                                        <div className={OrderStyles.image__container}>
                                            <span style={{ backgroundImage: `url(${el.image})` }}
                                                className={OrderStyles.image}></span>
                                            <p className="text text_type_main-default">{el.name}</p>
                                        </div>
                                        <div className={OrderStyles.price__container}>
                                            <p className="text text_type_digits-default">{`${counts[item]} x ${el.price}`}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                )
                            }
                        }
                    }
                    )}
                </div >
                <div className={OrderStyles.container}>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
                    <div className={OrderStyles.price__container}>
                        <p className="text text_type_digits-default">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </>


    )
}

export default CurrentOrder;

CurrentOrder.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    counts: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
}
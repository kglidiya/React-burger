import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedStyes from "./FeedOrderItem.module.css";
import { formatDate } from '../../utils/date';
import { setCurrentOrder } from '../../services/actions/orderActions'
import { FC } from 'react'
import { IIngredient, IOrderItemProps } from '../../utils/types';



const FeedOrderItem: FC<IOrderItemProps> = ({ order, openPopup, path, popup }) => {

    const ingredients = useSelector(state => state.ingredientsReducer.ingredients);
    let location = useLocation();
    const dispatch = useDispatch()

    const totalPrice = (ingredientsAll: IIngredient[], orders: string[]) => {

        let price = 0
        ingredientsAll.forEach((el) => {
            for (let i = orders.length - 1; i >= 0; i--) {
                if (el._id === orders[i]) {
                    price += el.price

                }
            }
        })
        return price
    }

    return (
        <Link to={{
            pathname: path,
            state: { background: location }
        }}
            className={FeedStyes.order}
            onClick={() => {
                openPopup(popup)
                dispatch((setCurrentOrder(order)))
            }}>
            <div className={FeedStyes.order__details}>
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {formatDate(order.createdAt)}
                </p>
            </div>
            <p className="text text_type_main-medium">{order.name}</p>
            <div className={FeedStyes.order__details}>
                <div className={FeedStyes.image_container}>
                    {ingredients.map((el, index: number) => {
                        const set = new Set(order.ingredients)
                        const ordersUnique = Array.from(set)
                        const ordersCut = ordersUnique.slice(0, 6)
                        const restItems = (ordersUnique.length) - ordersCut.length
                        for (let i = 0; i < ordersCut.length; i++) {
                            if (el._id === ordersCut[i]) {
                                return (
                                    <div key={el._id}
                                        className={FeedStyes.container}>
                                        <span className={FeedStyes.image}
                                            style={{
                                                zIndex: `${(ingredients.length - 1) - index}`,
                                                backgroundImage: `url(${el.image})`,
                                            }}>
                                        </span>
                                        {restItems > 0 && <span
                                            className={`${FeedStyes.items__number} text text_type_digits-default`}>
                                            {`+${restItems}`}
                                        </span>}
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
                <div className={FeedStyes.price_container}>
                    <p className="text text_type_digits-default">{totalPrice(ingredients, order.ingredients)}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}

export default FeedOrderItem;


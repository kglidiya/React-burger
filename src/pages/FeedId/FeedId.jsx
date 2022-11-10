import React from 'react';
import OrderStyles from '../ProfileOrdersId/ProfileOrderId.module.css';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import CurrentOrder from '../../components/CurrentOrder/CurrentOrder';

function FeedId() {

    const state = useSelector((state) => state);
    const ingredients = state.ingredientsReducer.ingredients;
    const data = state.wsReducer.orders;

    let orders
    if (data !== undefined) {
        orders = data.orders
    }
    const { id } = useParams()

    let order;
    const ingredientsFiltered = []
    let counts = {};
    let price = 0

    React.useMemo(() => {
        if (orders !== undefined) {
            order = orders.filter(el => el._id === id)[0]
            ingredients.filter((el) => {
                for (let item of order.ingredients) {
                    if (el._id === item) {
                        ingredientsFiltered.push(el)
                        price += el.price
                    }
                }
            })
            ingredientsFiltered.forEach((el) => {
                counts[el._id] = counts[el._id] ? (counts[el._id] + 1) : 1;
            });
        }
    }, [orders, state, ingredients])

    return (
        <div className={OrderStyles.main}>
            <div className={OrderStyles.container}>
                {orders === undefined && 'Информация загружается'}
                {orders !== undefined &&
                    <CurrentOrder
                        order={order}
                        ingredients={ingredients}
                        counts={counts}
                        price={price}
                    />}
            </div>
        </div>
    )
}

export default FeedId;


import React from 'react';
import { useSelector } from 'react-redux';
import CurrentOrder from '../CurrentOrder/CurrentOrder';


function OrderModal() {

    const state = useSelector((state) => state);
    const ingredients = state.ingredientsReducer.ingredients;
    const order = state.orderReducer.currentOrder.order;
    const data = state.wsReducer.orders;
    let orders;
  
    if (data !== undefined) {
        orders = data.orders
    }
    const ingredientsFiltered = [];
    let counts = {};
    let price = 0;

    React.useMemo(() => {
     if (orders !== undefined) {
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
    }, [orders, ingredients, counts])

    return (
        <>
            <CurrentOrder
                order={order}
                ingredients={ingredients}
                counts={counts}
                price={price}
            />
        </>
    )
}

export default OrderModal;
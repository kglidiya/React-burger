import React from 'react';
import { useSelector } from 'react-redux';
import CurrentOrder from '../CurrentOrder/CurrentOrder';


function OrderModal() {

    const state = useSelector((state) => state);
    const ingredients = state.ingredientsReducer.ingredients;
    const order = state.orderReducer.currentOrder.order;

    const ingredientsFiltered = [];
    let counts = {};
    let price = 0;

    React.useMemo(() => {
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
    }, [ingredients, counts])

    return (
        <>
            <CurrentOrder
                ingredients={ingredients}
                counts={counts}
                price={price}
            />
        </>
    )
}

export default OrderModal;
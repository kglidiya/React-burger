import React from 'react';
import OrderStyles from '../ProfileOrdersId/ProfileOrderId.module.css';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { useParams } from 'react-router-dom';
import CurrentOrder from '../../components/CurrentOrder/CurrentOrder';
import { WS_CONNECTION_START, WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_DELETE_ORDERS } from '../../services/actions/wsActions'
import Loader from '../../components/Loader/Loader';
import { IIngredient, IOrder, ICounts } from '../../utils/types';


function FeedId() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const ingredients = state.ingredientsReducer.ingredients;
    const data = state.wsReducer.orders;
    let orders: IOrder[] | undefined;
    const { id } = useParams<{ id?: string }>()
    let order: IOrder;
    const ingredientsFiltered: IIngredient[] = []
    let counts = {} as ICounts;
    let price = 0

    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `/all` });
        dispatch({ type: WS_GET_MESSAGE })

        setTimeout(() => {
            dispatch({ type: WS_CONNECTION_CLOSED })
        }, 300)
        return () => {
            dispatch({ type: WS_DELETE_ORDERS, payload: [] as IOrder[] })
        }

    }, [dispatch])

    if (data !== undefined) {
        orders = data.orders
    }

    React.useMemo(() => {
        if (orders !== undefined) {
            order = orders.filter((el: IOrder) => el._id === id)[0]
            ingredients.filter((el: IIngredient) => {

                for (let item of order.ingredients) {
                    if (el._id === item) {
                        ingredientsFiltered.push(el)
                        price += el.price
                    }
                }
            })
            ingredientsFiltered.forEach((el: IIngredient) => {
                counts[el._id] = counts[el._id] ? (counts[el._id] + 1) : 1;
            });
        }
    }, [orders, ingredients])


    return (
        <div className={OrderStyles.main}>
            <div className={OrderStyles.container}>
                {orders === undefined && <Loader />}
                {orders !== undefined &&
                    <CurrentOrder
                        ingredients={ingredients}
                        counts={counts}
                        price={price}
                    />}
            </div>
        </div>
    )
}

export default FeedId;


import React from 'react';
import OrderStyles from './ProfileOrderId.module.css';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { useParams } from 'react-router-dom';
import CurrentOrder from '../../components/CurrentOrder/CurrentOrder';
import Loader from '../../components/Loader/Loader';
import { getCookie } from "../../utils/cookie";
import { WS_CONNECTION_START, WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_DELETE_ORDERS } from '../../services/actions/wsActions'
import {IIngredient, IOrder, ICounts} from '../../utils/types';


function ProfileOrdersId() {
    const dispatch = useDispatch();
    const accessToken = getCookie('token');
    const state = useSelector((state) => state);
    const ingredients = state.ingredientsReducer.ingredients;
    const data = state.wsReducer.orders;
    const { id } = useParams<{id?: string}>();

    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `?token=${accessToken}` });
        dispatch({ type: WS_GET_MESSAGE })
    
        return () => {
         dispatch({ type: WS_CONNECTION_CLOSED })
            dispatch({ type: WS_DELETE_ORDERS, payload: [] as IOrder[] })
        }
    }, [dispatch, accessToken])

    let orders: IOrder[]|undefined;
    if (data !== undefined) {
        orders = data.orders
    }

    let order: IOrder;
    const ingredientsFiltered: IIngredient[] = []
    let counts = {} as ICounts;
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

export default ProfileOrdersId;
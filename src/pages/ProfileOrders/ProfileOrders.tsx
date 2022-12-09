import React, {FC, Dispatch, SetStateAction} from 'react';
import ProfileOrdersStyles from './ProfileOrders.module.css';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { WS_CONNECTION_START, WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_DELETE_ORDERS } from '../../services/actions/wsActions'
import ProrileOrderItem from '../../components/ProfileOrderItem/ProrileOrderItem';
import NavAside from '../../components/NavAside/NavAside';
import { getCookie } from "../../utils/cookie";
import Loader from '../../components/Loader/Loader';
import { getNewToken } from '../../services/actions/usersActions';
import {IOrder} from '../../utils/types'

const ProfileOrders: FC<{setCurrentModal: Dispatch<SetStateAction<string>>}>= ({ setCurrentModal }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const accessToken = getCookie('token')
        if (accessToken === undefined) {
            dispatch(getNewToken())
        }
        setTimeout(() => {
            dispatch({ type: WS_CONNECTION_START, payload: `?token=${accessToken}` });
            dispatch({ type: WS_GET_MESSAGE })
        })

        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED })
            dispatch({ type: WS_DELETE_ORDERS, payload: [] as IOrder[] })
        }
    }, [])

    const data = useSelector(state => state.wsReducer.orders);
    let orders;

    if (data !== undefined) {
        orders = data.orders
    }

    return (
        <>
            <main className={ProfileOrdersStyles.main}>
                <div className={ProfileOrdersStyles.nav__container}>
                    <NavAside text={'В этом разделе вы можете просмотреть свою историю заказов'} />
                </div>

                {orders === undefined && <Loader width={'50%'} />}
                <div className={ProfileOrdersStyles.scroll}>

                    {orders !== undefined && <section className={ProfileOrdersStyles.feed}>
                        {orders.length > 0 ? orders.map((order: IOrder) => {
                            return (
                                <ProrileOrderItem
                                    key={order._id}
                                    order={order}
                                    path={`/profile/orders/${order._id}`}
                                    openPopup={setCurrentModal}
                                    popup={'ProfileOrderPopup'}
                                />
                            )
                        }) : <p className="text text_type_main-large mt-5 pt-5">Вы еще не сделали ни одного заказа</p>
                        }
                    </section>}
                </div>
            </main>
        </>
    )

}

export default ProfileOrders;
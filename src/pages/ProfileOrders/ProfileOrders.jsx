import React from 'react';
import ProfileOrdersStyles from './ProfileOrders.module.css';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { WS_CONNECTION_START_ORDERS_USER, WS_GET_MESSAGE } from '../../services/actions/wsActions'
import ProrileOrderItem from '../../components/ProfileOrderItem/ProrileOrderItem';
import NavAside from '../../components/NavAside/NavAside';

function ProfileOrders({ setCurrentModal }) {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START_ORDERS_USER });
        dispatch({ type: WS_GET_MESSAGE })
    }, [])

    const data = useSelector((state => (state.wsReducer.orders)));
    let orders;

    if (data !== undefined) {
        orders = data.orders
   
    }
 

    return (
        <>
            {orders === undefined && 'Информация загружается'}
            {orders !== undefined &&
                <main className={ProfileOrdersStyles.main}>

                    <div className={ProfileOrdersStyles.nav__container}>
                        <NavAside text={'В этом разделе вы можете просмотреть свою историю заказов'} />
                    </div>

                    <div className={ProfileOrdersStyles.scroll}>
                        <section className={ProfileOrdersStyles.feed}>
                            {orders.reverse().map(order => {
                                order.uuid = uuid()
                                return (
                                    <ProrileOrderItem
                                        key={order.uuid}
                                        order={order}
                                        path={`/profile/orders/${order._id}`}
                                        openPopup={setCurrentModal}
                                        popup={'ProfileOrderPopup'}
                                    />
                                )
                            })
                            }
                        </section>
                    </div>
                </main>}
        </>

    )

}

export default ProfileOrders;
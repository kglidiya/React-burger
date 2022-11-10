import React from "react";
import FeedStyes from "./Feed.module.css";
import { useSelector, useDispatch } from "react-redux";
import FeedOrderItem from "../../components/FeedOrderItem/FeedOrderItem";
import uuid from "react-uuid";
import { WS_CONNECTION_START_ORDERS_ALL, WS_GET_MESSAGE } from '../../services/actions/wsActions'


function Feed({ setCurrentModal }) {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START_ORDERS_ALL });
        dispatch({ type: WS_GET_MESSAGE })

    }, [])

    const data = useSelector((state => (state.wsReducer.orders)));
    let orders;

    if ( data !== undefined) {
        orders = data.orders
    }

    function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    return (

        <main className={FeedStyes.main}>
            {orders === undefined && 'Информация загружается'}
            {orders !== undefined && <>
                <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
                <div className={FeedStyes.main__container}>
                    <div className={FeedStyes.scroll}>
                        <section className={FeedStyes.feed}>
                            {orders.map(order => {
                                order.uuid = uuid()
                                return (
                                    <FeedOrderItem
                                        key={order.uuid}
                                        order={order}
                                        path={`/feed/${order._id}`}
                                        openPopup={setCurrentModal}
                                        popup={'FeedPopup'}
                                    />
                                )
                            })
                            }
                        </section>
                    </div>

                    <section className={FeedStyes.statistics}>
                        <div className={FeedStyes.price_container}>
                            <div className={FeedStyes.orders}>
                                <p className="text text_type_main-medium mb-2">Готовы:</p>
                                <div className={FeedStyes.scroll_x}>
                                    {orders !== undefined && sliceIntoChunks(orders.filter(el => el.status === 'done'), 10).map((el, i) => {
                                        return (
                                            <ul className={FeedStyes.list} key={i}>
                                                {el.map((chunk, i) => {
                                                    return (
                                                        <li className={`${FeedStyes.color} text text_type_digits-default mb-2`}
                                                            key={i}>{chunk.number}</li>
                                                    )
                                                })}
                                            </ul>
                                        )
                                    })
                                    }
                                </div>
                            </div>

                            <div className={FeedStyes.orders}>
                                <p className="text text_type_main-medium">В работе:</p>
                                <div className={FeedStyes.scroll_x}>
                                    {orders !== undefined && sliceIntoChunks(orders.filter(el => el.status === 'created'), 10).map((el, i) => {
                                        return (
                                            <ul className={FeedStyes.list} key={i}>
                                                {el.map((chunk, i) => {
                                                    return (
                                                        <li className='text text_type_digits-default mb-2' key={i}>{chunk.number}</li>
                                                    )
                                                })}
                                            </ul>
                                        )
                                    })
                                    }
                                </div>
                            </div>

                        </div>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className={`${FeedStyes.total} text text_type_digits-large`}>{data !== undefined && data.total}</p>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className={`${FeedStyes.total} text text_type_digits-large`}>{data !== undefined && data.totalToday}</p>
                    </section>
                </div>
            </>}
        </main>
    );
}

export default Feed;

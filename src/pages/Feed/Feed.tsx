import React from "react";
import FeedStyes from "./Feed.module.css";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import FeedOrderItem from "../../components/FeedOrderItem/FeedOrderItem";
import { WS_CONNECTION_START, WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_DELETE_ORDERS } from '../../services/actions/wsActions'
import Loader from "../../components/Loader/Loader";
import { FC, Dispatch, SetStateAction } from 'react'
import { IOrder } from '../../utils/types';


const Feed: FC<{ setCurrentModal: Dispatch<SetStateAction<string>> }> = ({ setCurrentModal }) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `/all` });
        dispatch({ type: WS_GET_MESSAGE })

        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED })
            dispatch({ type: WS_DELETE_ORDERS, payload: [] as IOrder[] })
        }

    }, [dispatch])

    const data = useSelector(state => state.wsReducer.orders);
    let orders;

    if (data !== undefined) {
        orders = data.orders
    }

    function sliceIntoChunks(arr: IOrder[], chunkSize: number) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    return (

        <main className={FeedStyes.main}>
            {orders === undefined && <Loader />}
            {orders !== undefined && <>
                <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
                <div className={FeedStyes.main__container}>
                    <div className={FeedStyes.scroll}>
                        <section className={FeedStyes.feed}>
                            {orders.map((order: IOrder) => {
                                return (
                                    <FeedOrderItem
                                        key={order._id}
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

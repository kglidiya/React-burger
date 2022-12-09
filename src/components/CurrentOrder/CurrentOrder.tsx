import OrderStyles from './CurrentOrder.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDate } from '../../utils/date';
import { IIngredient } from '../../utils/types'
import { useSelector } from '../../services/hooks/hooks';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { ICounts, IOrder } from '../../utils/types'


interface ICurrentOrder {
    ingredients: IIngredient[],
    counts: ICounts,
    price: number
}


const CurrentOrder: FC<ICurrentOrder> = ({ ingredients, counts, price }) => {

    const orders = useSelector((state) => state.wsReducer.orders);
    const { id } = useParams<{ id?: string }>()
    const order = orders.orders.filter((el: IOrder) => el._id === id)[0]


    return (
        <>
            <div className={OrderStyles.main}>
                <p className={`${OrderStyles.text} text text_type_digits-default `}>{`#${order.number}`}</p>
                <h4 className="text text_type_main-medium">{order.name}</h4>
                <p className={`${OrderStyles.color} text text_type_main-default`}>{order.status === 'done' ? "Выполнен" : "В приготовлении"}</p>
                <p className="text text_type_main-medium mb-3">Состав:</p>
                <div className={OrderStyles.scroll}>
                    {ingredients.map((el) => {
                        for (let item in counts) {
                            if (el._id === item) {

                                return (
                                    <div key={el._id} className={OrderStyles.container}>
                                        <div className={OrderStyles.image__container}>
                                            <span style={{ backgroundImage: `url(${el.image})` }}
                                                className={OrderStyles.image}></span>
                                            <p className="text text_type_main-default">{el.name}</p>
                                        </div>
                                        <div className={OrderStyles.price__container}>
                                            <p className="text text_type_digits-default">{`${counts[item]} x ${el.price}`}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                )
                            }
                        }
                    }
                    )}
                </div >
                <div className={OrderStyles.container}>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
                    <div className={OrderStyles.price__container}>
                        <p className="text text_type_digits-default">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </>


    )
}

export default CurrentOrder;


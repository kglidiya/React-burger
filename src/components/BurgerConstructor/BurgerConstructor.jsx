import constructorStyles from './burgerConstructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import { BurgerContext } from '../../services/BurgerContext';
const url = 'https://norma.nomoreparties.space/api/orders';


BurgerConstructor.propTypes = {
    openPopup: PropTypes.func.isRequired,
    priceState: PropTypes.objectOf(PropTypes.number).isRequired,
    priceDispatcher: PropTypes.func.isRequired,
    setOrderNumber: PropTypes.func.isRequired
};


function BurgerConstructor({ openPopup, priceState, priceDispatcher, setOrderNumber }) {

    const ingredientsData = React.useContext(BurgerContext);

    const ingredientsId = [];
    ingredientsData.forEach(el => ingredientsId.push(el._id))


    React.useEffect(() => {
        ingredientsData.forEach(item => {
            if (item.name === 'Краторная булка N-200i') {
                priceDispatcher({ type: 'set', payload: priceState.price += item.price * 2 })
            }
            else if (item.name !== 'Краторная булка N-200i') {
                priceDispatcher({ type: 'set', payload: priceState.price += item.price })
            }
        })
    }, []);


    const getOrderNumber = async () => {
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ ingredients: ingredientsId })
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(res.status);
                })
                .then(data => {
                    setOrderNumber(data.order.number)
                })
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };

    return (
        <aside className={constructorStyles.sidebar}>
            <div className={constructorStyles.list__container}>
                <ul className={constructorStyles.list}>

                    <li className={constructorStyles.list__item} >
                        <div className={constructorStyles.item} >
                            {ingredientsData.map(item => {

                                if (item.name === 'Краторная булка N-200i') {
                                    return (
                                        <ConstructorElement


                                            type="top"
                                            isLocked={true}
                                            text={`${item.name} (верх)`}
                                            price={item.price}
                                            thumbnail={item.image}
                                            key={item._id}
                                        />
                                    )
                                }
                            })
                            }


                        </div>
                    </li>
                    <li >
                        <ul className={constructorStyles.scroll}>
                            {ingredientsData.map(item => {

                                if (item.type === 'main' || item.type === 'sauce') {
                                    return (
                                        <li className={constructorStyles.item} key={item._id}>
                                            <DragIcon type="primary" />
                                            <ConstructorElement

                                                text={item.name}
                                                price={item.price}
                                                thumbnail={item.image}
                                            />
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </li>

                    <li className={constructorStyles.list__item}>
                        <div className={constructorStyles.item} >
                            {ingredientsData.map(item => {
                                if (item.name === 'Краторная булка N-200i') {
                                    return (
                                        <ConstructorElement
                                            type="bottom"
                                            isLocked={true}
                                            text={`${item.name} (низ)`}
                                            price={item.price}
                                            thumbnail={item.image}
                                            key={item._id}
                                        />
                                    )
                                }
                            })
                            }
                        </div>
                    </li>
                </ul>
            </div>

            <div className={constructorStyles.price__container}>
                <div className={constructorStyles.price}>
                    <p className="text text_type_digits-medium">{priceState.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={() => {
                    openPopup('OrderPopup');
                    getOrderNumber()
                }}>
                    Оформить заказ
                </Button>
            </div>

        </aside>
    )
}


export default BurgerConstructor;
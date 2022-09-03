import constructorStyles from './burgerConstructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';


BurgerConstructor.propTypes = {
    openPopup: PropTypes.func.isRequired,
    ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
};

function BurgerConstructor({ openPopup, ingredientsData }) {

    let priceTotal = 0;

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
                                priceTotal += item.price;
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
                    <p className="text text_type_digits-medium">{priceTotal + 400}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={() => {
                    openPopup('OrderPopup')
                }}>
                    Оформить заказ
                </Button>
            </div>

        </aside>
    )
}


export default BurgerConstructor;
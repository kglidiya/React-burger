import constructorStyles from './burgerConstructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const ingredientsPropTypes = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired,
    "proteins": PropTypes.number.isRequired,
    "fat": PropTypes.number.isRequired,
    "carbohydrates": PropTypes.number.isRequired,
    "calories": PropTypes.number.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
    "image_mobile": PropTypes.string,
    "image_large": PropTypes.string,
    "__v": PropTypes.number.isRequired
  });

  BurgerConstructor.propTypes = {
    props: PropTypes.arrayOf(ingredientsPropTypes.isRequired)
  }


function BurgerConstructor(props) {

    const ingredients = props;
    let priceTotal = 0;

    return (
        <aside className={constructorStyles.sidebar}>
            <div className={constructorStyles.list__container}>
                <ul className={constructorStyles.list}>

                    <li className={constructorStyles.list__item} >
                        <div className={constructorStyles.item} >
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={200}
                                thumbnail={ingredients.props[0].image}
                            />
                        </div>
                    </li>
                    <li >
                        <ul className={constructorStyles.scroll}>
                            {ingredients.props.map(item => {
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
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text="Краторная булка N-200i (низ)"
                                price={200}
                                thumbnail={ingredients.props[0].image}
                            />
                        </div>
                    </li>
                </ul>
            </div>

            <div className={constructorStyles.price__container}>
                <div className={constructorStyles.price}>
                    <p className="text text_type_digits-medium">{priceTotal + 400}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>

        </aside>
    )
}


export default BurgerConstructor;
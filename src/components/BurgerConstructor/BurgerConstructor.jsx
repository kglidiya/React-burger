import constructorStyles from './BurgerConstructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {stylePropTypes} from '../../utils/types'
import React from 'react';
import { useDrop, } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import ConstructorItem from './ConstructorItem'
import {
     deleteItem,
    setOrderDetails,
    getOrderNumber,
    swapItems
} from '../../services/actions';

BurgerConstructor.propTypes = {
    openPopup: PropTypes.func.isRequired,
    onDropHandler: PropTypes.func.isRequired,
    style: stylePropTypes
};


function BurgerConstructor({ openPopup, onDropHandler, style }) {
    const dispatch = useDispatch();
    const ingrediendsConstructor = useSelector((state) => state.constructorReducer.constructor);

    const listRef = React.useRef([]);
    let priceTotal = 0;
    const ingredientsIds = []

    const [price, setPrice] = React.useState(0);

    const [{ didDrop}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            didDrop: monitor.didDrop(),
          
        })
    });

    function deleteIngredient(e) {
        ingrediendsConstructor.map((el, i) => {
            if (listRef.current[i].contains(e.target)
                && e.target.closest('div').childNodes[0].childNodes[1].textContent === el.name) {
                dispatch(deleteItem(i))
            }
        })
    }

    function getIngredientsId() {
        ingrediendsConstructor.map(el => {
            ingredientsIds.push(el._id)
        })     
    }

    React.useEffect(() => {
        ingrediendsConstructor.forEach((el) => {
            priceTotal += el.price;
            setPrice(priceTotal)
        })
        getIngredientsId()
      dispatch(setOrderDetails(ingredientsIds))
    }, [didDrop, ingrediendsConstructor.length])


    const movePetListItem = React.useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(swapItems(dragIndex, hoverIndex))
        },
        [ingrediendsConstructor]

    )

    return (
        <aside className={constructorStyles.sidebar}>
            <div className={constructorStyles.list__container} style={style} ref={dropTarget}>
                <ul className={constructorStyles.list} >
                    <li className={constructorStyles.list__item}  >
                        {ingrediendsConstructor.map((item, i) => {
                            if (item.type === 'bun' && i === 0) {
                                return (
                                    <div className={constructorStyles.item} key={i}
                                        ref={(ref) => (listRef.current[i] = ref)}
                                    >
                                        <ConstructorElement
                                            type="top"
                                            isLocked={true}
                                            text={`${item.name} (верх)`}
                                            price={item.price}
                                            thumbnail={item.image}
                                        />
                                    </div>
                                )
                            }
                        })
                        }
                    </li>

                    <li >
                        <ul className={constructorStyles.scroll} >
                            {ingrediendsConstructor.map((item, i) => {
                                if (item.type === 'main' || item.type === 'sauce') {
                                    if(item.name === 'Соус Spicy-X') {
                                        item.name = item.name + ' межорбитальный'
                                    }
                                    return (
                                        <li className={constructorStyles.drag__list} key={i}
                                            ref={(ref) => (listRef.current[i] = ref)}
                                        >
                                            <ConstructorItem
                                                deleteIngredient={deleteIngredient}
                                                el={item}
                                                index={i}
                                                moveListItem={movePetListItem}
                                            />
                                        </li>
                                    )
                                }
                            })
                            }
                        </ul>
                    </li>

                    <li className={constructorStyles.list__item}  >
                        {ingrediendsConstructor.map((item, i) => {
                            if (item.type === 'bun' && i === 1) {
                                return (
                                    <div className={constructorStyles.item} key={i} ref={(ref) => (listRef.current[i] = ref)}>
                                        <ConstructorElement
                                            type="bottom"
                                            isLocked={true}
                                            text={`${item.name} (низ)`}
                                            price={item.price}
                                            thumbnail={item.image}
                                        />
                                    </div>
                                )
                            }
                        })
                        }
                    </li>
                </ul>
            </div>

            <div className={constructorStyles.price__container}>
                <div className={constructorStyles.price}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={() => {
                    getIngredientsId()
                    dispatch(getOrderNumber(ingredientsIds, openPopup))
                }}>
                    Оформить заказ
                </Button>
            </div>

        </aside>
    )
}


export default BurgerConstructor;

import constructorStyles from './BurgerConstructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { stylePropTypes } from '../../utils/types';
import { isTokenExpired } from '../../utils/token'
import { getCookie } from "../../utils/cookie";
import React from 'react';
import { useDrop, } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import ConstructorItem from './ConstructorItem';
import {
    deleteItem,
    swapItems,
} from '../../services/actions/constructorActions';
import {
    setOrderDetails,
    getOrderNumber,
    GET_ORDER_REQUEST,
    GET_ORDER_ERROR
} from '../../services/actions/orderActions';
import {
    getNewToken,
} from '../../services/actions/usersActions';
import { useHistory } from 'react-router-dom';

BurgerConstructor.propTypes = {
    openPopup: PropTypes.func.isRequired,
    onDropHandler: PropTypes.func.isRequired,
    style: stylePropTypes
};


function BurgerConstructor({ openPopup, onDropHandler, style }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const ingrediendsConstructor = useSelector((state) => state.constructorReducer.constructor);
    const isLoading = useSelector(state => state.orderReducer.orderRequest)
    const auth = useSelector(state => state.userReducer.isAuthenticated)

    const listRef = React.useRef([])
    let priceTotal = 0
    const ingredientsIds = []
    const token = getCookie('token')

    const [price, setPrice] = React.useState(0);

    const [{ didDrop }, dropTarget] = useDrop({
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


    const moveListItem = React.useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(swapItems(dragIndex, hoverIndex))
        },
        [ingrediendsConstructor]
    )

    function redirect() {
        history.replace({ pathname: '/login', state: '/' })
    }

    function checkToken() {
        if (token === undefined) {
            dispatch(getNewToken())
        }
        if (token !== undefined) {
            const isExpired = isTokenExpired(token)
            if (isExpired) {
                dispatch(getNewToken())
            }
        }
    }

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
                                    if (item.name === 'Соус Spicy-X') {
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
                                                moveListItem={moveListItem}
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
                    if (!auth) {
                        redirect()
                        dispatch({
                            type: GET_ORDER_ERROR
                        })
                    } else {
                        checkToken()
                        setTimeout(() => {
                            dispatch({
                                type: GET_ORDER_REQUEST
                            })
                            dispatch(getOrderNumber(ingredientsIds, openPopup))
                        }, 0)
                    }
                }}>
                    {isLoading && 'Ожидайте номер заказа...'}
                    {!isLoading && 'Оформить заказ'}
                </Button>
            </div>

        </aside>
    )
}


export default BurgerConstructor;

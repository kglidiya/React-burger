import constructorStyles from "./BurgerConstructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, SetStateAction, Dispatch } from 'react';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import ConstructorItem from "./ConstructorItem";
import {
    swapItems,
    isBunChosen,
} from "../../services/actions/constructorActions";
import {
    getOrderNumber,
    GET_ORDER_REQUEST,
    GET_ORDER_ERROR,
} from "../../services/actions/orderActions";
import { useHistory } from "react-router-dom";
import { IIngredient} from '../../utils/types'




interface IBurgerConstructorProps {
    openPopup: Dispatch<SetStateAction<string>>,
    onDropHandler: (itemId: { _id: string }) => void,
    style: { boxShadow: string } | undefined,
}



const BurgerConstructor: FC<IBurgerConstructorProps> = ({ openPopup, onDropHandler, style }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state)
    const ingrediendsConstructor = state.constructorReducer.constructor;
    const isLoading = state.orderReducer.orderRequest;
    const auth = state.userReducer.isAuthenticated;
    const isBun = state.constructorReducer.isBunChosen;
    const listRef = React.useRef<any[]>([]);

    let priceTotal = 0;
    const ingredientsIds: string[] = [];
    const [price, setPrice] = React.useState(0);
    const [isFillings, setIsFillings] = React.useState(false);

    const [{ didDrop }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId: { _id: string }) {
            onDropHandler(itemId);
        },
        collect: (monitor) => ({
            didDrop: monitor.didDrop(),
        }),
    });


    function getIngredientsId() {
        ingrediendsConstructor.map((el: IIngredient) => {
            ingredientsIds.push(el._id);
        });
    }

    React.useEffect(() => {
        if (ingrediendsConstructor.length === 0) {
            setIsFillings(false);
            setPrice(0)
        }
        ingrediendsConstructor.forEach((el: IIngredient) => {
            priceTotal += el.price;
            setPrice(priceTotal);
            if (el.type === "main" || el.type === "sauce") {
                setIsFillings(true);
            } else setIsFillings(false);
            if (el.type === "bun") {
                dispatch(isBunChosen(true));
            }
        });
    }, [didDrop, ingrediendsConstructor.length, dispatch]);

    const moveListItem = React.useCallback(
        (dragIndex: number, hoverIndex: number) => {
            dispatch(swapItems(dragIndex, hoverIndex));
        }, [dispatch]);

    function redirect() {
        history.replace({ pathname: "/login", state: "/" });
    }


    return (
        <aside className={constructorStyles.sidebar}>
            <div
                className={constructorStyles.list__container}
                style={style}
                ref={dropTarget}
            >
                <ul className={constructorStyles.list}>
                    <li className={constructorStyles.list__item}>
                        {!isBun && (
                            <div
                                className={`${constructorStyles.empty__item} ${constructorStyles.empty__item_top}`}
                            >
                                <p className="text_type_main-defaul"></p>
                                Пожалуйста, перенесите сюда булку и начинки из раздела слева для
                                создания заказа
                            </div>
                        )}
                        {isBun &&
                            ingrediendsConstructor.map((item: IIngredient, i: number) => {
                                if (item.type === "bun" && i === 0) {
                                    return (
                                        <div
                                            className={constructorStyles.item}
                                            key={i}
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
                                    );
                                }
                            })}
                    </li>

                    <li>
                        <ul className={constructorStyles.scroll}>
                            {!isFillings && (
                                <div className={constructorStyles.background}></div>
                            )}
                            {ingrediendsConstructor.map((item: IIngredient, i: number) => {

                                if (item.type === "main" || item.type === "sauce") {
                                    if (item.name === "Соус Spicy-X") {
                                        item.name = item.name + " межорбитальный";
                                    }
                                    return (
                                        <li
                                            className={constructorStyles.drag__list}
                                            key={item.uuid}
                                            ref={(ref) => (listRef.current[i] = ref)}
                                        >
                                            <ConstructorItem
                                                el={item}
                                                index={i}
                                                moveListItem={moveListItem}
                                                uuid={item.uuid}

                                            />
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </li>

                    <li className={constructorStyles.list__item}>
                        {!isBun && (
                            <div className={`${constructorStyles.empty__item} ${constructorStyles.empty__item_bottom}`}>
                                <p className="text_type_main-defaul"></p>
                                Пожалуйста, перенесите сюда булку и начинки из раздела слева для
                                создания заказа
                            </div>
                        )}
                        {isBun &&
                            ingrediendsConstructor.map((item: IIngredient, i: number) => {
                                if (item.type === "bun" && i === 1) {
                                    return (
                                        <div
                                            className={constructorStyles.item}
                                            key={i}
                                            ref={(ref) => (listRef.current[i] = ref)}
                                        >
                                            <ConstructorElement
                                                type="bottom"
                                                isLocked={true}
                                                text={`${item.name} (низ)`}
                                                price={item.price}
                                                thumbnail={item.image}
                                            />
                                        </div>
                                    );
                                }
                            })}
                    </li>
                </ul>
            </div>

            <div className={constructorStyles.price__container}>
                <div className={constructorStyles.price}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    type="primary"
                    size="medium"
                    onClick={() => {
                        getIngredientsId();
                        if (!auth) {
                            redirect();
                            dispatch({
                                type: GET_ORDER_ERROR,
                            });
                        }
                        if (auth && isBun) {
                            dispatch({
                                type: GET_ORDER_REQUEST,
                            });
                            dispatch(
                                getOrderNumber(ingredientsIds, openPopup)
                            );
                        }
                    }} htmlType={"button"}                >
                    {isLoading && "Ожидайте номер заказа..."}
                    {!isLoading && "Оформить заказ"}
                </Button>
            </div>
        </aside>
    );
}

export default BurgerConstructor;

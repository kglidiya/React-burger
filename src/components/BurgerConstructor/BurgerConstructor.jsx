import constructorStyles from './burgerConstructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';




function BurgerConstructor(props) {

    const ingredients = props;
    let priceTotal = 0;
    return (
        <aside className={constructorStyles.sidebar}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ul className={constructorStyles.list}>

                    <li style={{ paddingRight: '35px', paddingLeft: '75px' }} >
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
                    <li style={{ paddingRight: '35px', paddingLeft: '75px', marginTop: '12px' }}>
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
            <div className={constructorStyles.container}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
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
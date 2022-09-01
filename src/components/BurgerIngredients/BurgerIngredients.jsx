import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyles from './burgerIngredients.module.css';
import Ingredient from "./Ingredient/Ingredient";
import PropTypes from 'prop-types';
import {ingredientType} from '../utils/types'


BurgerIngredients.propTypes = {
    openPopup: PropTypes.func,
    ingredientsData: PropTypes.arrayOf(ingredientType.isRequired),
    onclick: PropTypes.func
}

function BurgerIngredients({openPopup, ingredientsData, onClick}) {
   
    const [current, setCurrent] = React.useState('one')

    return (
        <main className={burgerStyles.main}>
            <h1 className="text text_type_main-large pt-1 pr-1 pb-5 pl-1" >Соберите бургер</h1>

            <section className={burgerStyles.section}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </section>

            <div className={burgerStyles.scroll}>
            <section>
                    <h2 className="text text_type_main-medium pb-2 pt-5 mb-5 mt-5"> Булки</h2>
                    <div className={burgerStyles.container}>
                        {ingredientsData.map(item => {
                            if (item.type === 'bun') {
                                return <Ingredient ingredient={item} key={item._id} openPopup={openPopup} getCurrentIngredient={onClick} />
                            }
                        })}
                    </div>
                </section>

                <section>
                    <h2 className="text text_type_main-medium mb-5 pb-2"> Соусы</h2>
                    <div className={burgerStyles.container}>
                        {ingredientsData.map(item => {
                            if (item.type === 'sauce') {
                                return <Ingredient ingredient={item} key={item._id} openPopup={openPopup} getCurrentIngredient={onClick} />
                            }
                        })}
                    </div>
                </section>

                <section>
                    <h2 className="text text_type_main-medium pb-2 pt-5 mb-5 mt-5"> Начинки</h2>
                    <div className={burgerStyles.container}>
                        {ingredientsData.map(item => {
                            if (item.type === 'main') {
                                return <Ingredient ingredient={item} key={item._id} openPopup={openPopup} getCurrentIngredient={onClick} />
                            }
                        })}
                    </div>
                </section>

            </div>
        </main>
    )
}


export default BurgerIngredients;
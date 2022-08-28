import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerStyles from './burgerIngredients.module.css';
import Ingredient from "./Ingredient/Ingredient";
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

BurgerIngredients.propTypes = {
    props: PropTypes.arrayOf(ingredientsPropTypes.isRequired)
}

function BurgerIngredients(props) {
 const ingredients = props;

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
                        {ingredients.props.map(ingredient => {
                            if (ingredient.type === 'bun') {
                                return <Ingredient props={ingredient} key={ingredient._id} />
                            }
                        })}
                    </div>
                </section>
                <section>
                    <h2 className="text text_type_main-medium mb-5 pb-2"> Соусы</h2>
                    <div className={burgerStyles.container}>
                        {ingredients.props.map(ingredient => {
                            if (ingredient.type === 'sauce') {
                                return <Ingredient props={ingredient} key={ingredient._id} />
                            }
                        })}
                    </div>
                </section>
                <section>
                    <h2 className="text text_type_main-medium pb-2 pt-5 mb-5 mt-5"> Начинки</h2>
                    <div className={burgerStyles.container}>
                        {ingredients.props.map(ingredient => {
                            if (ingredient.type === 'main') {
                                return <Ingredient props={ingredient} key={ingredient._id} />
                            }
                        })}
                    </div>
                </section>
            </div>
        </main>

    )
}

export default BurgerIngredients;
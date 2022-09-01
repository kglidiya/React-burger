import React from "react";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './ingredients.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';


Ingredient.propTypes = {
    openPopup: PropTypes.func.isRequired,
    ingredient: ingredientType.isRequired,
    getCurrentIngredient: PropTypes.func.isRequired,
};

function Ingredient({ openPopup, ingredient, getCurrentIngredient }) {

    const [isChosen, setIsChosen] = React.useState(false);
    const currentItem = React.useRef(null);

    const choose = () => {
        setIsChosen(true)
        getCurrentIngredient(currentItem.current.textContent)
    }

    return (
        <article className={ingredientsStyles.container} onClick={() => {
            openPopup('IngredientPopup');
            choose();
        }}>
            {isChosen && <Counter count={1} size="default" style={{ position: 'absolute' }} />}
            <img src={ingredient.image} alt={ingredient.image} className={ingredientsStyles.image} />
            <div className={ingredientsStyles.price} >
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small mt-3" ref={currentItem}>{ingredient.name}</p>
        </article>

    )
}

export default Ingredient;

import React from "react";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './ingredients.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
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

  Ingredient.propTypes = {
    props: ingredientsPropTypes.isRequired
}

function Ingredient(props) {
    const ingredients = props;
    const [isChosen, setIsChosen] = React.useState(false)

    const choose = () => {
        setIsChosen(true)
    }

    return (
        <article className={ingredientsStyles.container}>
            {isChosen && <Counter count={1} size="default" style={{ position: 'absolute' }} />}
            <img src={ingredients.props.image} alt="Картинка" className={ingredientsStyles.image} onClick={choose} />
            <div className={ingredientsStyles.price}>
                <p className="text text_type_digits-default">{ingredients.props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small mt-3">{ingredients.props.name}</p>
        </article>

    )
}

export default Ingredient;
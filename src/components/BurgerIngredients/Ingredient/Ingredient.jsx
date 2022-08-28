import React, { useState } from "react";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './ingredients.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
    const [isChosen, setIsChosen] = React.useState(false)

    const choose = () => {
        setIsChosen(true)
    }

    return (
        <article className={ingredientsStyles.container}>
            {isChosen && <Counter count={1} size="default" style={{ position: 'absolute' }} />}
            <img src={props.props.image} alt="Картинка" className={ingredientsStyles.image} onClick={choose} />
            <div className={ingredientsStyles.price}>
                <p className="text text_type_digits-default">{props.props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small mt-3">{props.props.name}</p>
        </article>

    )
}

export default Ingredient;
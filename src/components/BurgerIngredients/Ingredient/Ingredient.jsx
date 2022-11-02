import React from 'react';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./Ingredients.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../../services/actions/currentIngredientActions";
import { Link } from 'react-router-dom';
import { useDrag } from "react-dnd";



const Ingredient = ({ openPopup, ingredient, setStyle }) => {

    const ingredientsConstructor = useSelector((state) => state.constructorReducer.constructor);
    const dispatch = useDispatch();
    const { _id, ...content } = ingredient;
    let count = 0;

    const [{ isDragging }, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

       React.useEffect(() => {
        if (isDragging) {
            setStyle({
                boxShadow: `inset 0 4px 20px rgba(51, 51, 255, 0.5),
        inset 0 0 8px rgba(51, 51, 255, 0.25),
        inset 0 0 8px rgba(51, 51, 255, 0.25)`})
        } else setStyle()
    }, [isDragging])


    return (
        <Link
            to={{ pathname: `/ingredients/${_id}` }}
            ref={dragRef}
            className={ingredientsStyles.container}
            onClick={() => {
                openPopup("IngredientPopup");
                dispatch(setCurrentIngredient(ingredient))
            }}>
            {ingredientsConstructor.map((el, index) => {
                if (el._id === ingredient._id) {
                    count++;
                    return <Counter count={count} size="default" key={index} />;
                }
            })}

            <img src={content.image}
                alt={content.image}
                className={ingredientsStyles.image} />
            <div className={ingredientsStyles.price}>
                <p className="text text_type_digits-default">{content.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small mt-3">{content.name}</p>
        </Link>
    );
};

Ingredient.propTypes = {
    openPopup: PropTypes.func.isRequired,
    ingredient: ingredientType.isRequired,
    setStyle: PropTypes.func.isRequired
};

export default Ingredient;

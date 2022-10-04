import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./Ingredients.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../../services/actions";

import { useDrag } from "react-dnd";

const Ingredient = ({ openPopup, ingredient }) => {
    const ingrediendsConstructor = useSelector(
        (state) => state.draggableIngredientReducer.draggedElement
    );

    const dispatch = useDispatch();

    const { _id, ...content } = ingredient;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
    });

    let count = 0;

    return (
        <article ref={dragRef}
            className={ingredientsStyles.container}
            onClick={() => {
                openPopup("IngredientPopup");
                dispatch(setCurrentIngredient(ingredient));
            }}
        >
            {ingrediendsConstructor.map((el, index) => {
                if (el._id === ingredient._id) {
                    count++;
                    return <Counter count={count} size="default" key={index} />;
                }
            })}

            <img
                src={content.image}
                alt={content.image}
                className={ingredientsStyles.image}
            />
            <div className={ingredientsStyles.price}>
                <p className="text text_type_digits-default">{content.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small mt-3">{content.name}</p>
        </article>
    );
};

Ingredient.propTypes = {
    openPopup: PropTypes.func.isRequired,
    ingredient: ingredientType.isRequired,
};

export default Ingredient;

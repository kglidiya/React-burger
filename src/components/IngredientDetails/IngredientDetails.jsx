import ingredientDetails from './ingredientDetails.module.css';
import { ingredientType } from '../utils/types';
import PropTypes from 'prop-types';

IngredientDetails.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType.isRequired),
    currentIngredient: PropTypes.string
};

function IngredientDetails({ ingredientsData, currentIngredient }) {

    return (
        <>
            <h3 className={`${ingredientDetails.header} text text_type_main-large`}>Детали ингредиента</h3>
            {ingredientsData.map(item => {
                if (item.name === currentIngredient) {
                    return (
                        <div key={item._id} className={ingredientDetails.container}>
                            <img src={item.image} alt={item.image} className={ingredientDetails.image} />
                            <h4 className={`${ingredientDetails.title} text text_type_main-medium`} >{item.name}</h4>
                            <ul className={ingredientDetails.list}>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{item.calories}</p>
                                </li>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{item.proteins}</p>
                                </li>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{item.fat}</p>
                                </li>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{item.carbohydrates}</p>
                                </li>
                            </ul>
                        </div>
                    )

                }
            })}
        </>
    )
}

export default IngredientDetails;
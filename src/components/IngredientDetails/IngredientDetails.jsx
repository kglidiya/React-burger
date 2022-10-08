import ingredientDetails from './IngredientDetails.module.css';
import {  useSelector } from 'react-redux';



function IngredientDetails() {

    const currentIngredient = useSelector((state) => state.currentIngredientReducer.currentIngredient);
   

    return (
        <>
            <h3 className={`${ingredientDetails.header} text text_type_main-large`}>Детали ингредиента</h3>
           
                        <div  className={ingredientDetails.container}>
                            <img src={currentIngredient.image} alt={currentIngredient.image} className={ingredientDetails.image} />
                            <h4 className={`${ingredientDetails.title} text text_type_main-medium`} >{currentIngredient.name}</h4>
                            <ul className={ingredientDetails.list}>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{currentIngredient.calories}</p>
                                </li>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{currentIngredient.proteins}</p>
                                </li>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{currentIngredient.fat}</p>
                                </li>
                                <li className={ingredientDetails.item}>
                                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                                    <p className="text text_type_digits-default text_color_inactive pt-2">{currentIngredient.carbohydrates}</p>
                                </li>
                            </ul>
                        </div>
               
        </>
    )
}

export default IngredientDetails;
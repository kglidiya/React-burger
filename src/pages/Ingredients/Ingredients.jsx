import ingredientDetails from './Ingredients.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Ingredients() {
    const state = useSelector((state) => state);
    const ingredients = state.ingredientsReducer.ingredients;
    const { id } = useParams()


    return (
        <main className={ingredientDetails.main}>
            {ingredients.map((el) => {
                if (el._id === id) {
                    return (<div className={ingredientDetails.container} key={el._id} >
                        <h3 className={`${ingredientDetails.header} text text_type_main-large`}>Детали ингредиента</h3>
                        <img src={el.image} alt={el.image} className={ingredientDetails.image} />
                        <h4 className={`${ingredientDetails.title} text text_type_main-medium`} >{el.name}</h4>
                        <ul className={ingredientDetails.list}>
                            <li className={ingredientDetails.item}>
                                <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">{el.calories}</p>
                            </li>
                            <li className={ingredientDetails.item}>
                                <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">{el.proteins}</p>
                            </li>
                            <li className={ingredientDetails.item}>
                                <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">{el.fat}</p>
                            </li>
                            <li className={ingredientDetails.item}>
                                <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">{el.carbohydrates}</p>
                            </li>
                        </ul>
                    </div>)
                }
            })}

        </main>
    )
}

export default Ingredients;
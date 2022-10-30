import { useEffect } from 'react';
import React from 'react';
import appStyles from '../../App/App.module.css';
import BurgerIngredients from '../../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../BurgerConstructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { setInitialConstructor } from '../../../services/actions/constructorActions';
import { getAllItems } from '../../../services/actions/ingredientsActions';



function Main({ setCurrentModal }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItems())
  }, [])

  const state = useSelector((state) => state);
  const ingredients = state.ingredientsReducer.ingredients;
  const isLoading = state.ingredientsReducer.ingredientsRequest;
  const hasError = state.ingredientsReducer.ingredientsError;
  const ingrediendsConstructor = state.constructorReducer.constructor;

  React.useEffect(() => {
    if (ingrediendsConstructor.length === 0) {
      dispatch(setInitialConstructor(ingredients))
    }
  }, [ingredients])

  //Highlighting active constructor border
  const [style, setStyle] = React.useState();

  const [ingredientsConstructor, setIngredientsConstructor] = React.useState([ingrediendsConstructor]);

  const handleDrop = (itemId) => {

    setIngredientsConstructor([
      ...ingredientsConstructor,
      ingrediendsConstructor.splice(2, 0, ...ingredients.filter((element) => element._id === itemId._id && element.type !== 'bun'))
    ])

    ingredients.map((el) => {
      if (el.type === 'bun' && el._id === itemId._id) {
        setIngredientsConstructor([
          ingrediendsConstructor.splice(0, 2, el, el)
        ])
      }
    })
  };

  return (

    <>
      <DndProvider backend={HTML5Backend}>
        {isLoading && "Загрузка"}
        {hasError && "Произошла ошибка"}

        <main className={appStyles.main}>
          {!isLoading &&
            !hasError &&
            <BurgerIngredients
              openPopup={setCurrentModal}
              setStyle={setStyle}
            />
          }

          {!isLoading &&
            !hasError &&
            <BurgerConstructor
              openPopup={setCurrentModal}
              onDropHandler={handleDrop}
              style={style} />
          }
        </main>
      </DndProvider>
    </>

  );
}

export default Main;
import React from 'react';
import appStyles from '../../components/App/App.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from '../../components/Loader/Loader';

function Main({ setCurrentModal }) {

  const state = useSelector((state) => state);
  const ingredients = state.ingredientsReducer.ingredients;
  const isLoading = state.ingredientsReducer.ingredientsRequest;
  const hasError = state.ingredientsReducer.ingredientsError;
  const ingrediendsConstructor = state.constructorReducer.constructor;
  const isBun = state.constructorReducer.isBunChosen

  //Highlighting active constructor border
  const [style, setStyle] = React.useState();

  const [ingredientsConstructor, setIngredientsConstructor] = React.useState([ingrediendsConstructor]);

  const handleDrop = (itemId) => {

    setIngredientsConstructor([
      ...ingredientsConstructor,
      ingrediendsConstructor.splice(2, 0, ...ingredients.filter((element) =>
        element._id === itemId._id && element.type !== 'bun'))
    ])

    ingredients.map((el) => {
      if (el.type === 'bun' && el._id === itemId._id) {
        isBun ?
          setIngredientsConstructor([
            ingrediendsConstructor.splice(0, 2, el, el)
          ]) :
          setIngredientsConstructor([
            ingrediendsConstructor.splice(0, 0, el, el)
          ])
      }
    })

  };


  return (
    <>
      <DndProvider backend={HTML5Backend}>
       

        <main className={appStyles.main}>
        {isLoading && <Loader/>}
        {hasError && "Произошла ошибка"}
          {!isLoading &&
            !hasError &&
            <>
            <BurgerIngredients
              openPopup={setCurrentModal}
              setStyle={setStyle}
            />
            <BurgerConstructor
              openPopup={setCurrentModal}
              onDropHandler={handleDrop}
              style={style}
            />
            </>
        
          }

        </main>
      </DndProvider>
    </>

  );
}

export default Main;
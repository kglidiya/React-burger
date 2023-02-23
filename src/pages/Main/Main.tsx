import React, { FC, Dispatch, SetStateAction } from 'react';
import appStyles from '../../components/App/App.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from '../../components/Loader/Loader';
import { addItem } from '../../services/actions/constructorActions';


const Main: FC<{ setCurrentModal: Dispatch<SetStateAction<string>> }> = ({ setCurrentModal }) => {

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const ingredients = state.ingredientsReducer.ingredients;
  const isLoading = state.ingredientsReducer.ingredientsRequest;
  const hasError = state.ingredientsReducer.ingredientsError;
  const ingredientsConstructor = state.constructorReducer.constructor;
  const isBun = state.constructorReducer.isBunChosen

  //Highlighting active constructor border
  const [style, setStyle] = React.useState<{ boxShadow: string }>({ boxShadow: '' });

  const [, setIngredientsConstructor] = React.useState([ingredientsConstructor]);

  const handleDrop = (itemId: { _id: string }) => {
    ingredients.map((el) => {
      if (el.type === 'bun' && el._id === itemId._id) {
        isBun ?
          setIngredientsConstructor([
            ingredientsConstructor.splice(0, 2, el, el)
          ]) :
          setIngredientsConstructor([
            ingredientsConstructor.splice(0, 0, el, el)
          ])
      }
    })
    ingredients.map((el) => {
      if (el.type !== 'bun' && el._id === itemId._id) {
        dispatch(addItem(el))
      }
    })

  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.main}>
          {isLoading && <Loader />}
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
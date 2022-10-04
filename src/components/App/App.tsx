import { useEffect, useState, useReducer } from 'react';
import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getAllItems } from '../../services/actions'


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllItems() as any)
  }, [])

  const state = useSelector((state: any) => state);
  const ingredients = state.draggableIngredientReducer.data;
  const isLoading = state.shopReducer.isLoading;
  const hasError = state.shopReducer.hasError;
  const ingrediendsConstructor = state.draggableIngredientReducer.draggedElement;


  //Modals open/close
  const [currentModal, setCurrentModal] = React.useState('');

  const [ingredientsConstructor, setIngredientsConstructor] = React.useState([ingrediendsConstructor]);

  const handleDrop = (itemId: any) => {

    setIngredientsConstructor([
      ...ingredientsConstructor,
      ingrediendsConstructor.push(...ingredients.filter((element: any) => element._id === itemId._id && element.type !== 'bun'))
    ])

    ingredients.map((el: any) => {
      if (el.type === 'bun' && el._id === itemId._id) {
        setIngredientsConstructor([
          ingrediendsConstructor.splice(0, 2, el, el)
        ])
      }
    })
  };

  return (

    <div className={appStyles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.main}>
          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка'}
          {!isLoading &&
            !hasError &&
            <BurgerIngredients
              openPopup={setCurrentModal}
            />
          }
          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка'}
          {!isLoading &&
            !hasError &&
            <BurgerConstructor
              openPopup={setCurrentModal}
              onDropHandler={handleDrop} />
          }
        </main>
      </DndProvider>

      <Modal
        isOpen={currentModal === 'IngredientPopup'}
        onClose={setCurrentModal}
        height={'538px'}>
        <IngredientDetails />
      </Modal>
      <Modal
        isOpen={currentModal === 'OrderPopup'}
        onClose={setCurrentModal}
        height={'718px'}>
        <OrderDetails />
      </Modal>
    </div>
  );
}


export default App;

import { useEffect, useState } from 'react';
import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
const config = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  })
  
  //API
  const getIndredientsData = async () => {
    try {
      setState({ ...state, isLoading: true });
      await fetch(config)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res.status);
        })
        .then(data => {
          setState({
            isLoading: false,
            hasError: false,
            ingredients: data.data
          });
        })
    } catch (error) {
      setState({
        ...state,
        hasError: true,
      });
      return Promise.reject(console.log(`Произошла ошибка: ${error}`));
    }
  };

  useEffect(() => {
    getIndredientsData();
  }, [])

  const { isLoading, hasError, ingredients } = state;

  //Set current ingredient in modalIngredient
  const [currentIngredient, setCurrent] = React.useState(null);

  //Modals open/close
  const [currentModal, setCurrentModal] = React.useState('');


  return (

    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>

        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          <BurgerIngredients openPopup={setCurrentModal} ingredientsData={ingredients} onClick={setCurrent} />
        }
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          <BurgerConstructor openPopup={setCurrentModal} ingredientsData={ingredients} />
        }
      </main>

      <Modal 
      isOpen={currentModal === 'IngredientPopup'} 
      onClose={setCurrentModal} 
      height={'538px'}>
        <IngredientDetails currentIngredient={currentIngredient} />
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

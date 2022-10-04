import { useEffect, useState, useReducer } from 'react';
import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { BurgerContext } from '../../services/BurgerContext';
import {INGEDIENTS_API} from '../../utils/api'

const priceInitialState = { price: 0 }
function reducer(state: any, action: any) {
    switch (action.type) {
      case "set":
        return { price: action.payload };
      case "reset":
        return priceInitialState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  } 

function App() {
  const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState, undefined)

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  })
  
  //API
  const getIndredientsData = async () => {
    try {
      setState({ ...state, isLoading: true });
      await fetch(INGEDIENTS_API)
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

  const [orderNumber, setOrderNumber] = useState(0);


  return (

    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>

        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          <BurgerIngredients openPopup={setCurrentModal} ingredientsData={ingredients} onClick={setCurrent}/>
        }
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          <BurgerContext.Provider value={ingredients}>
          <BurgerConstructor openPopup={setCurrentModal} priceState={priceState} priceDispatcher={priceDispatcher}
          setOrderNumber={setOrderNumber} />
          </BurgerContext.Provider>
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
    
        <OrderDetails orderNumber={orderNumber}/>
      </Modal>
    </div>

  );
}


export default App;

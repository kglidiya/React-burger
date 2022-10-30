import { useEffect } from 'react';
import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../pages/Main/Main';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Orders from '../pages/Orders/Orders';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound404 from '../pages/NotFound404/NotFound404';
import Ingredients from '../pages/Ingredients/Ingredients';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../services/actions/ingredientsActions'
import { Switch, Route, useHistory } from 'react-router-dom';




function App() {
  useEffect(() => {
    dispatch(getAllItems() as any)
  }, [])

  const history = useHistory()
  const background = history.action === 'POP'
  const dispatch = useDispatch();
  const [currentModal, setCurrentModal] = React.useState('');
  

  return (

    <div className={appStyles.app}>
      <AppHeader />

      <Switch >
        <Route path="/profile/orders" exact={true}><Orders /></Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute >
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <Orders />
        </ProtectedRoute>
        <Route path="/login" exact={true}><Login /></Route>
        <Route path="/register" exact={true}><Register /></Route>
        <Route path="/forgot-password" exact={true}><ForgotPassword /></Route>
        <Route path="/reset-password" exact={true}><ResetPassword /></Route>
        <Route path="/" exact={background ? true : false}> <Main setCurrentModal={setCurrentModal} /> </Route>
        <Route path="/ingredients/:id" exact={true}><Ingredients /></Route>
        <Route><NotFound404 /></Route>
      </Switch>

      <Modal
        isOpen={currentModal === 'IngredientPopup'}
        onClose={setCurrentModal}
        height={'538px'}>
        <Route path="/ingredients/:id"  >
          <IngredientDetails />
        </Route>
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

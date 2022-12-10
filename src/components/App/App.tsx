import { useEffect } from 'react';
import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../../pages/Main/Main';
import Profile from '../../pages/Profile/Profile';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound404 from '../../pages/NotFound404/NotFound404';
import Ingredients from '../../pages/Ingredients/Ingredients';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import Feed from '../../pages/Feed/Feed';
import FeedId from '../../pages/FeedId/FeedId';
import OrderModal from '../OrderModal/OrderModal';
import ProfileOrdersId from '../../pages/ProfileOrdersId/ProfileOrdersId';
import ProfileOrders from '../../pages/ProfileOrders/ProfileOrders';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { getAllItems } from '../../services/actions/ingredientsActions';
import { deleteCurrentIngredient } from '../../services/actions/currentIngredientActions';
import { deleteCurrentOrder } from '../../services/actions/orderActions';
import { getNewToken, authenticate } from '../../services/actions/usersActions'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { getCookie } from '../../utils/cookie'
import { IIngredient } from '../../utils/types';

function App() {
  const location = useLocation<{ background: Location }>();
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const history = useHistory()
  const background = location.state && location.state.background;
  const auth = state.userReducer.isAuthenticated
  const token: string | undefined = getCookie('token')
  const refreshToken: string | undefined = localStorage['token']

  useEffect(() => {
    if (refreshToken === undefined) {
      dispatch(authenticate(false))
    }
    dispatch(getAllItems())
    history.replace({ pathname: location.pathname })
  }, [])


  if (auth && token === undefined) {
    dispatch(getNewToken())
  }

  const [currentModal, setCurrentModal] = React.useState<string>('');

  function closeIngredientModal() {
    setCurrentModal('')
    dispatch(deleteCurrentIngredient({} as IIngredient))
    history.replace({ pathname: '/' })
  }

  function closeFeedModal() {
    setCurrentModal('')
    history.replace({ pathname: '/feed' })
    setTimeout(() => dispatch(deleteCurrentOrder()), 0)
  }

  function closeProfileOrderModal() {
    setCurrentModal('')
    history.replace({ pathname: '/profile/orders' })
    setTimeout(() => dispatch(deleteCurrentOrder()), 0)
  }

  function closeOrderPopup() {
    setCurrentModal('')
  }

  return (

    <div className={appStyles.app}>
      <AppHeader />
      <Switch location={background || location}>

        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute >

        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfileOrders setCurrentModal={setCurrentModal} />
        </ProtectedRoute>

        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <ProfileOrdersId />
        </ProtectedRoute>

        <Route path="/feed" exact={true}><Feed setCurrentModal={setCurrentModal} /></Route>
        <Route path="/login" exact={true}><Login /></Route>
        <Route path="/register" exact={true}><Register /></Route>
        <Route path="/forgot-password" exact={true}><ForgotPassword /></Route>
        <Route path="/reset-password" exact={true}><ResetPassword /></Route>
        <Route path="/" exact={true}> <Main setCurrentModal={setCurrentModal} /> </Route>
        <Route path="/feed/:id" exact={true}><FeedId /></Route>
        <Route path="/ingredients/:id" exact={true}><Ingredients /></Route>
        <Route><NotFound404 /></Route>

      </Switch>

      <Modal
        isOpen={currentModal === 'IngredientPopup'}
        onClose={closeIngredientModal}
        height={'538px'}>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>
      </Modal>

      <Modal
        isOpen={currentModal === 'FeedPopup'}
        onClose={closeFeedModal}
        height={'auto'}>
        <Route path="/feed/:id" >
          <OrderModal />
        </Route>
      </Modal>

      <Modal
        isOpen={currentModal === 'ProfileOrderPopup'}
        onClose={closeProfileOrderModal}
        height={'auto'}>
        <Route path="/profile/orders/:id"  >
          <OrderModal />
        </Route>
      </Modal>

      <Modal
        isOpen={currentModal === 'OrderPopup'}
        onClose={closeOrderPopup}
        height={'718px'}>
        <OrderDetails />
      </Modal>

    </div>

  );
}


export default App;

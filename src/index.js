import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { orderReducer } from './services/reducers/orderReducer';
import { ingredientsReducer } from './services/reducers/ingredientsReducer';
import { constructorReducer } from './services/reducers/constructorReducer';
import { currentIngredientReducer } from './services/reducers/currentIngredientReducer';
import { userReducer } from './services/reducers/userReducer';
import { wsReducer } from './services/reducers/wsReducer';
import { BrowserRouter as Router } from "react-router-dom";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { wsActions } from './services/actions/wsActions';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer', 'constructorReducer', 'wsReducer']
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk,
  socketMiddleware(wsUrl, wsActions)
));

const reducers = combineReducers({
  ingredientsReducer,
  constructorReducer,
  currentIngredientReducer,
  orderReducer,
  userReducer,
  wsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, enhancer)

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);




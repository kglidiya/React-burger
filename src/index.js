import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { orderReducer } from './services/orderReducer';
import { ingredientsReducer } from './services/ingredientsReducer';
import { constructorReducer } from './services/constructorReducer';
import { currentIngredientReducer } from './services/currentIngredientReducer'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const reducers = combineReducers({
  ingredientsReducer,
  constructorReducer,
  currentIngredientReducer,
  orderReducer
})

const store = createStore(
  reducers, enhancer
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);




import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {ingredients} from '../utils/data'

function App() {
  return (
    <div className={ appStyles.app }>
      <AppHeader/>
      <main className={ appStyles.main }>
      <BurgerIngredients props={ingredients}/>
      <BurgerConstructor props={ingredients}/>
      </main>
    </div>
  );
}


export default App;

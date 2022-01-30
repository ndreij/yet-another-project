import AppHeader from './components/app-header/app-header.js'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.js'
import BurgerConstructor from './components/burger-constructor/burger-constructor.js'
import Data from './utils/data.js'
import styles from './app.module.css'

function App() {
  return (
    <>
    <AppHeader />
    <section className={styles.content}>
      <div className={styles.ingredients}>
        <BurgerIngredients data={Data} />
      </div>
      <div className={styles.constructor}>
        <BurgerConstructor />
      </div>
    </section>
    </>
  );
}

export default App;

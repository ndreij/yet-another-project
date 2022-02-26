import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import styles from './app.module.css'
import React from 'react'
import Modal from '../modal/modal.js'
import OrderDetails from '../order-details/order-details.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'
import {useSelector, useDispatch} from 'react-redux'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions/async.js';


function App() {

  const modalState = useSelector(state => state.miscList.modalState)
  
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <section className={styles.content}>
        <div className={styles.ingredients}>
          <BurgerIngredients/>
        </div>
        <div className={styles.constructor}>
            <BurgerConstructor/>
        </div>
      </section>


      {modalState.visible && modalState.content === 'total' &&
        <Modal header={modalState.header}>
          <OrderDetails />
        </Modal>
      }

      {modalState.visible && modalState.content === 'ingredient' &&
        <Modal header={modalState.header}>
          <IngredientDetails item={modalState.item} />
        </Modal>
      }
      </DndProvider>
    </>
  );
}

export default App;

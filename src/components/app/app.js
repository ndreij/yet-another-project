import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import styles from './app.module.css'
import React from 'react'
import Modal from '../modal/modal.js'
import OrderDetails from '../order-details/order-details.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'
import { useSelector, useDispatch } from 'react-redux'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions/async.js';
import { HIDE_MODAL } from '../../services/actions'
import { Switch, Route, useHistory } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  IngredientsPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
  NotFound404
} from '../../pages'
import { ProtectedRoute } from './protectedroute.js'

function App() {

  const modalState = useSelector(state => state.miscList.modalState)

  const dispatch = useDispatch()
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  function onClose() {
    history.goBack();
    dispatch({ type: HIDE_MODAL })
  }

  function onOrderClose() {
    dispatch({ type: HIDE_MODAL })
  }

  return (
 <>
      <Switch>
        <Route path="/" exact={true}>
          <>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
              <section className={styles.content}>
                <div className={styles.ingredients}>
                  <BurgerIngredients />
                </div>
                <div className={styles.constructor}>
                  <BurgerConstructor />
                </div>
              </section>
            </DndProvider>
          </>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/ingredients">
          <IngredientsPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

{modalState.visible && modalState.content === 'total' &&
<Modal header={modalState.header} onClose={onOrderClose}>
  <OrderDetails />
</Modal>
}

{modalState.visible && modalState.content === 'ingredient' &&
<Route path="/ingredients/:id">
<Modal header={modalState.header} onClose={onClose}>
  <IngredientDetails item={modalState.item} />
</Modal>
</Route>
}
</>

  );
}

export default App;

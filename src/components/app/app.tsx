import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './app.module.css'
import React from 'react'
import { Modal } from '../modal/modal'
import OrderDetails from '../order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useSelector, useDispatch } from '../../services/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions';
import { HIDE_MODAL } from '../../services/constants'
import { Switch, Route, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  IngredientsPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
  NotFound404,
  FeedPage,
  OrdersPage
} from '../../pages'
import { ProtectedRoute } from '../protected-route'
import { Item } from "../../utils/types"
import { ExistingOrderDetails } from '../../components/existing-order-details'

function App() {

  let location = useLocation<any>();
  let background = location.state && location.state.background;
  const modalState = useSelector((state) => state.miscList.modalState)

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

  type MatchParams = {
    id: string;
  }

  let match = useRouteMatch<MatchParams>("/ingredients/:id");
  const data = useSelector((state) => state.miscList.data)
  let itemFromURL: Item | null = null;
  data.length >= 0 && match && data.forEach((item: Item) => {
    if (item._id === match?.params.id) {
      itemFromURL = item
    }
  })

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <>
            <DndProvider backend={HTML5Backend}>
              <section className={styles.content}>
                <div className={styles.ingredients}>
                  <BurgerIngredients />
                </div>
                <div className={styles.burgerconstructor}>
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

        <Route path="/feed/:orderId">
          <div className={styles.orderwrapper}>
            <ExistingOrderDetails orderNumberPositionLeft={false}/>
          </div>
        </Route>

        <Route path="/feed" >
          <FeedPage />
        </Route>

        <ProtectedRoute path="/profile/orders/:orderId">
        <div className={styles.orderwrapper}>
          <ExistingOrderDetails />
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/profile/orders">
          <OrdersPage />
        </ProtectedRoute>

        <ProtectedRoute path="/order/:id">
          <FeedPage />
        </ProtectedRoute>

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

      {background && data.length > 0 &&
        <Route path="/ingredients/:id">
          <Modal header={"???????????? ??????????????????????"} onClose={onClose}>
            <IngredientDetails item={itemFromURL} />
          </Modal>
        </Route>
      }

      {background &&
        <Route path="/feed/:orderId">
          <Modal header={""} onClose={onClose}>
            <ExistingOrderDetails orderNumberPositionLeft={true}/>
          </Modal>
        </Route>
      }

      {background &&
        <Route path="/profile/orders/:orderId">
          <Modal header={""} onClose={onClose}>
            <ExistingOrderDetails orderNumberPositionLeft={true}/>
          </Modal>
        </Route>
      }

    </>

  );
}

export default App;

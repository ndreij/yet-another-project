import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import styles from './app.module.css'
import React from 'react'
import Modal from '../modal/modal.js'
import OrderDetails from '../order-details/order-details.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'

function App() {

  const url = "https://norma.nomoreparties.space/api/ingredients"

  const [data, setData] = React.useState([])

  const [modalState, setModalState] = React.useState({ visible: false, header: '', content: 'ingredient', item: {} })

  React.useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          return Promise.reject('error 404')
        } else {
          return Promise.reject('some other error: ' + response.status)
        }
      })
      .then(data => setData(data.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <AppHeader />
      <section className={styles.content}>
        <div className={styles.ingredients}>
          <BurgerIngredients data={data} setModalState={setModalState} />
        </div>
        <div className={styles.constructor}>
          <BurgerConstructor data={data} setModalState={setModalState} />
        </div>
      </section>

      {modalState.visible && modalState.content === 'total' &&
        <Modal header={modalState.header} setModalState={setModalState}>
          <OrderDetails />
        </Modal>
      }

      {modalState.visible && modalState.content === 'ingredient' &&
        <Modal header={modalState.header} setModalState={setModalState}>
          <IngredientDetails item={modalState.item} />
        </Modal>
      }

    </>
  );
}

export default App;

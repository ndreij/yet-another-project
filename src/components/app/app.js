import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import styles from './app.module.css'
import React, { createContext } from 'react'
import Modal from '../modal/modal.js'
import OrderDetails from '../order-details/order-details.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'
import UserContext from '../../user-context.js'
import { v4 as uuidv4 } from 'uuid'

function App() {

  const url = "https://norma.nomoreparties.space/api/ingredients"

  const [data, setData] = React.useState([{name: '', type: '', image: '', image_large: '', proteins: 0, fat: 0, carbohydrates: 0, price: 0, _id:'0'}])

  const [modalState, setModalState] = React.useState({ visible: false, header: '', content: 'ingredient', item: {} })

  const [orderNumber, setOrderNumber] = React.useState('')

  const [cart, setCart] = React.useState([])

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
      // Пока нет механики добавления ингредиентов вручную, просто скидываем всю базу в корзину
      .then(data => {setData(data.data); updateCart(data.data)})
      .catch(error => console.log(error))
  }, [])

  function updateCart(items) {
    
    let newCart = cart;
    let newCartItems = []
    let wrappedBunTop = {}
    let wrappedBunBottom = {}

    items.forEach(item => {
      if (item.type === "bun") {
        // Если добавляется булка, удалем любые другие булки в корзине
        newCart = cart.filter(item => item.type !== "bun")
        wrappedBunTop = {...item, name: `${item.name} (верх)`, bunType: "top", uuid: uuidv4()}
        wrappedBunBottom = {...item, name: `${item.name} (низ)`, bunType: "bottom", uuid: uuidv4()}
      } else {
        newCartItems.push({...item, uuid: uuidv4()})
      }
    }
    )
    setCart([...newCart, ...newCartItems, wrappedBunTop, wrappedBunBottom])
  }

  return (
    <>
      <AppHeader />
      <UserContext.Provider value={{data: data, orderNumber: orderNumber, setOrderNumber: setOrderNumber, cart: cart, setCart: setCart}}>
      <section className={styles.content}>
        <div className={styles.ingredients}>
          <BurgerIngredients data={data} setModalState={setModalState} />
        </div>
        <div className={styles.constructor}>
            <BurgerConstructor setModalState={setModalState} />
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
      </UserContext.Provider>
    </>
  );
}

export default App;

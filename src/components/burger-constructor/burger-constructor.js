import styles from './burger-constructor.module.css'
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { 
  UPDATE_TOTAL_PRICE,
} from '../../services/actions'
import { useSelector } from 'react-redux'
import { DraggableItem } from './draggable-item.js'
import { DropTarget } from '../drop-target/drop-target.js'
import { sendOrder } from '../../services/actions/async.js'
import { getAuth } from '../../services/actions/authactions.js';
import { Link } from 'react-router-dom'

function BurgerConstructor() {

  const cart = useSelector(store => store.miscList.cart)

  const {totalPrice} = useSelector(state => state.miscList);

  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    let totalCart = cart;
    totalCart.map(item => (total += item.price));
    dispatch({type: UPDATE_TOTAL_PRICE, payload: total})
  },
    [cart, totalPrice, dispatch]
  );

  const isAuthLoaded = useSelector(state => state.auth.isAuthLoaded)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const init = useCallback(() => {
      dispatch(getAuth());
  }, [dispatch]);

  useEffect(() => {
      init();
  }, [init]);

  if (!isAuthLoaded) {
      return null;
  }

  return (
    <div className={styles.constructorwrapper}>

      {/* Показываем заглушку если булок нет */}
      <DropTarget>
      {cart.filter(item => item.type === 'bun').length === 0 &&
        <div className={styles.constructorelementtop}>
          <span className="styles.constructor-element__row">
            <span className="constructor-element__text">Добавьте булку</span>
          </span>
        </div>
      }

      {cart.map((item, index) => {
        if (item.type === "bun" && item.bunType === "top") {
          return (
            <div key={item.uuid} className={styles.constructorelement}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          )
        }
        return null
      })
      }

      <div className={styles.scrollablecontent}>

        {/* Показываем заглушку если начинок нет */}

        {cart.filter(item => item.type === 'main' || item.type === "sauce").length === 0 &&
          <div className={styles.constructorelementmiddle}>
            <span className="styles.constructor-element__row">
              <span className="constructor-element__text">Добавьте начинку</span>
            </span>
          </div>
        }

        <ul className={styles.list}>
          {cart.map((item, index) => {
            if (item.type === "main" || item.type === "sauce") {
              return (
                <DraggableItem item={item}  key={item.uuid} index={index}/>
              )
            }
            return null
          })
          }
        </ul>
      </div>

      {/* Показываем заглушку если булок нет */}

      {cart.filter(item => item.type === 'bun').length === 0 &&
        <div className={styles.constructorelementbottom}>
          <span className="styles.constructor-element__row">
            <span className="constructor-element__text">Добавьте булку</span>
          </span>
        </div>
      }

      {cart.map((item, index) => {
        if (item.type === "bun" && item.bunType === "bottom") {
          return (
            <div key={item.uuid} className={styles.constructorelement}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          )
        }
        return null
      })
      }
      </DropTarget>

      <div id="checkout" className={styles.checkout}>
        <div id="total" className={styles.total}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <svg className="pl-4"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M10.3849 2.65561C10.5818 2.18895 10.0397 1.75899 9.63011 2.05689L1.41184 8.03382C1.15309 8.222 1.00001 8.52262 1.00001 8.84256V13.4828C1.00001 13.6932 1.13171 13.8811 1.32948 13.9529L4.15637 14.9785C4.65685 15.1601 5.21185 14.9177 5.41879 14.4271L10.3849 2.65561Z" />
            <path d="M1.62116 15.9076C1.32217 15.7916 1.00001 16.0122 1 16.3329C1 16.4889 1.07968 16.634 1.21127 16.7178L10.2307 22.4574C10.3326 22.5223 10.4408 22.3844 10.3536 22.3008L5.22556 17.3879C5.13043 17.2968 5.01823 17.2254 4.89541 17.1777L1.62116 15.9076Z" />
            <path d="M13.6465 22.3008C13.5592 22.3844 13.6674 22.5223 13.7693 22.4574L22.7887 16.7178C22.9203 16.634 23 16.4889 23 16.3329C23 16.0122 22.6778 15.7916 22.3788 15.9076L19.1046 17.1777C18.9818 17.2254 18.8696 17.2968 18.7745 17.3879L13.6465 22.3008Z" />
            <path d="M22.6705 13.9529C22.8683 13.8811 23 13.6932 23 13.4828V8.84256C23 8.52262 22.8469 8.222 22.5882 8.03382L14.3699 2.05689C13.9603 1.75899 13.4183 2.18895 13.6151 2.65561L18.5812 14.4271C18.7882 14.9177 19.3432 15.1601 19.8436 14.9785L22.6705 13.9529Z" />
            <path d="M12.7142 20.9615C12.3221 21.3616 11.6779 21.3616 11.2858 20.9615L7.10635 16.6968C6.83068 16.4155 6.7458 15.9986 6.88954 15.6319L11.069 4.97004C11.4009 4.12332 12.5991 4.12333 12.931 4.97004L17.1105 15.6319C17.2542 15.9986 17.1693 16.4155 16.8937 16.6968L12.7142 20.9615Z" />
          </svg>
        </div>
        {isLoggedIn ? 
        <Button disabled={cart.length === 0 ? true : false} type="primary" size="large" onClick={() => { dispatch(sendOrder()) }}>
          Оформить заказ
        </Button>
        :
        <Link to="/login">
        <Button type="primary" size="large">
        Оформить заказ
      </Button>
      </Link>
}
      </div>

    </div>
  )
}

export default BurgerConstructor
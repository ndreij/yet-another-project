import { 
    UPDATE_ORDER_NUMBER, 
    UPDATE_ORDER_NUMBER_LOADING, 
    UPDATE_TOTAL_PRICE,
    SHOW_INGREDIENT_MODAL,
    HIDE_MODAL,
    SHOW_ORDER_MODAL,
    INGEST_DATA,
    UPDATE_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_INGREDIENTS,
    SORT_INGREDIENTS,
    MOVE_CARD
 } from "../actions";
 import { v4 as uuidv4 } from 'uuid'

const initialState = {
    orderNumber: 0,
    orderNumberLoading: true,
    totalPrice: 0,
    modalState: {
        visible: false,
        header: '',
        content: 'ingredient',
        item: {}
    },
    data : [],
    cart: []
};

export const miscReducer = (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_ORDER_NUMBER: {
            return {
                ...state,
                orderNumber: action.payload,
            };
        }

        case UPDATE_ORDER_NUMBER_LOADING: {
            return {
                ...state,
                orderNumberLoading: action.payload,
            };
        }

        case UPDATE_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.payload,
            };
        }

        case HIDE_MODAL: {
            return {
                ...state,
                modalState: {
                ...state.modalState,
                visible: false
                }
            };
        }

        case SHOW_INGREDIENT_MODAL: {
            return {
                ...state,
                modalState: {
                    ...state.modalState,
                    visible: true,
                    content: 'ingredient',
                    header: 'Детали ингредиента',
                    item: action.payload
                }
                
            };
        }

        case SHOW_ORDER_MODAL: {
            return {
                ...state,
                modalState: {...state.modalState,
                    visible: true, 
                    content: 'total'
            }
        }
    }

    case INGEST_DATA: {
        return {
            ...state,
            data: [...action.payload]
            
        };
    }

        case UPDATE_CART: {

            let newCart = state.cart.slice();
            const items = [action.payload].flat()
            items.forEach(item => {
              if (item.type === "bun") {
                // Если добавляется булка, удалем любые другие булки в корзине
                let cartWithoutBuns = newCart.filter(item => item.type !== "bun")
                const wrappedBunTop = {...item, name: `${item.name} (верх)`, bunType: "top", uuid: uuidv4()}
                const wrappedBunBottom = {...item, name: `${item.name} (низ)`, bunType: "bottom", uuid: uuidv4()}
                newCart = [...cartWithoutBuns, wrappedBunTop, wrappedBunBottom]
            } else {
                newCart.push({...item, uuid: uuidv4()})
              }
            })
        return {
            ...state,
            cart: [
                ...newCart, 
                ]
        };
    }

    case REMOVE_ITEM_FROM_CART: {
        const id = action.payload
        const newCart = state.cart.filter(item => item._id !== id)
        return {
            ...state,
            cart: newCart
        };
    }

    case UPDATE_INGREDIENTS: {
        return {
            ...state,
            cart: state.ingredients.map(ingredient =>
                ingredient.id === action.id ? { ...ingredient } : ingredient
            )
        };
    }

    case SORT_INGREDIENTS: {
        return {
          ...state,
          cart: action.ingredients,
        };
      }

      case MOVE_CARD: {
        return {
          ...state,
          cart: action.payload,
        };
      }
    
    
        default:
            return state;
    }
}; 
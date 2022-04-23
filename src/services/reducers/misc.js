import {
    UPDATE_TOTAL_PRICE,
    SHOW_INGREDIENT_MODAL,
    HIDE_MODAL,
    UPDATE_CART,
    REMOVE_ITEM_FROM_CART,
    MOVE_CARD,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SEND_ORDER,
    SEND_ORDER_FAILED,
    SEND_ORDER_SUCCESS,
} from "../constants";
import { initialState } from '../store'

export const miscReducer = (state = initialState, action) => {
    switch (action.type) {

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

        case UPDATE_CART: {

            let newCart = state.cart.slice();
            const items = [action.payload].flat()
            items.forEach(item => {
                if (item.type === "bun") {
                    // Если добавляется булка, удалем любые другие булки в корзине
                    let cartWithoutBuns = newCart.filter(item => item.type !== "bun")
                    const wrappedBunTop = { ...item, name: `${item.name} (верх)`, bunType: "top" }
                    const wrappedBunBottom = { ...item, name: `${item.name} (низ)`, bunType: "bottom" }
                    newCart = [...cartWithoutBuns, wrappedBunTop, wrappedBunBottom]
                } else {
                    newCart.push({ ...item })
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
            const itemUUID = action.payload
            const newCart = state.cart.filter(item => item.uuid !== itemUUID)
            return {
                ...state,
                cart: newCart
            };
        }

        case MOVE_CARD: {
            return {
                ...state,
                cart: action.payload,
            };
        }

        case GET_INGREDIENTS: {
            return {
                ...state,
                dataRequest: true,
                dataFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                dataRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                dataFailed: true,
                dataRequest: false
            };
        }

        case SEND_ORDER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                modalState: {
                    ...state.modalState,
                    visible: true,
                    content: 'total',
                    header: ''
                }
            }
        }

        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                cart: [],
                orderNumber: action.payload.order.number,
                orderRequest: false,
            };
        }

        case SEND_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }

        default:
            return state;
    }
}; 
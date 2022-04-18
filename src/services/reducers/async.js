import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SEND_ORDER, 
    SEND_ORDER_FAILED,
    SEND_ORDER_SUCCESS,
} from '../constants';

import { initialState } from '../store'

export const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
                // Запрос начал выполняться
        dataRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                dataFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
                ...state, 
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                data: action.data, 
                // Запрос закончил своё выполнение
                dataRequest: false 
            };
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
                ...state, 
                // Запрос выполнился с ошибкой, 
                // выставляем соответсвующие значения в хранилище
                dataFailed: true, 
                // Запрос закончил своё выполнение
                dataRequest: false 
            };
    }

    case SEND_ORDER: {
        return {
          ...state,
                  // Запрос начал выполняться
          orderRequest: true,
                  // Сбрасываем статус наличия ошибок от предыдущего запроса 
                  // на случай, если он был и завершился с ошибкой
                  orderFailed: false,
        };
      }
      case SEND_ORDER_SUCCESS: {
        return { 
                  ...state, 
                  // Запрос выполнился успешно, помещаем полученные данные в хранилище
                  order: action.order, 
                  // Запрос закончил своё выполнение
                  ordreRequest: false 
              };
      }
      case SEND_ORDER_FAILED: {
        return { 
                  ...state, 
                  // Запрос выполнился с ошибкой, 
                  // выставляем соответсвующие значения в хранилище
                  orderFailed: true, 
                  // Запрос закончил своё выполнение
                  orderRequest: false 
              };
      }
        default: {
            return state
        }
    }
}
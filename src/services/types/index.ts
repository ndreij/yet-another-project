import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from '../..';

import { TAuthActions } from '../actions/auth';
import { TWsActions } from '../actions/websockets'
import { TFeedActions } from '../actions/feed';
import { TMiscActions } from '../actions';

import {
  WS_CONNECTION_INIT, 
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_SUCCESS,
  WS_ON_MESSAGE,
  WS_SEND_MESSAGE,
  PROCESS_ORDERS
} from '../constants';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions = 
 | TAuthActions
 | TWsActions
 | TFeedActions
 | TMiscActions

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, Action, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 

export type TWsMiddlewareActions = {
  readonly onInit: typeof WS_CONNECTION_INIT;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS,
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onClose: typeof WS_CONNECTION_CLOSE;
  readonly onClosed: typeof WS_CONNECTION_CLOSED;
  readonly onSend: typeof WS_SEND_MESSAGE;
  readonly onMessage: typeof WS_ON_MESSAGE;
  readonly processOrders: typeof PROCESS_ORDERS
};
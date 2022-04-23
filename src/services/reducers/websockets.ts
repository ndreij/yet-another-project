import {
  WS_CONNECTION_INIT,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_ON_MESSAGE
} from '../constants';
import { TWsActions } from '../actions/websockets';

export type TWebSocketsState = {
  connected: boolean;
  error: string | null;
  messages: string[];
};

const initialState: TWebSocketsState = {
  connected: false,
  error: null,
  messages: [],
};

export const websocketsReducer = (
  state: TWebSocketsState = initialState,
  action: TWsActions,
) => {
  switch (action.type) {
    case WS_CONNECTION_INIT:
      return {
        ...state,
        connected: false,
        error: null,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        connected: false,
        error: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false,
      };
    case WS_ON_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

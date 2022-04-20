import type { Middleware, MiddlewareAPI } from 'redux';
import type { TApplicationActions, AppDispatch, RootState, TWsMiddlewareActions } from '../types';
import { TServerFeedMessage } from '../../utils/interfaces/feed';

export const socketMiddleware = (wsActions: TWsMiddlewareActions): Middleware => (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => async (action: TApplicationActions) => {
  let ws: WebSocket | undefined;
  const { onOpen, onError, onMessage, onClosed, onSend, onInit, onClose, processOrders} = wsActions;

  switch (action.type) {
    case onInit: {
      const { dispatch } = store;
      const { url, type } = action.payload;
     
      ws = new WebSocket(url);

      if (ws) {

        ws.onopen = () => dispatch({type: onOpen});
        ws.onerror = (event) => dispatch({type: onError, payload: event.type});

        ws.onmessage = (event) => {
          const { data } = event;
          const parsedData: TServerFeedMessage = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData});
          dispatch({ type: processOrders, payload: { data: parsedData, type }});
          
        };

        ws.onclose = (event) => dispatch({ type: onClosed, payload: event });
      }
      break;
    }
    case onSend:
      if (ws) {
        ws.send(JSON.stringify(action.payload));
      }
      break;
    case onClose:
      if (ws) {
        ws.close();
      }
      break;
    default:
  }

  next(action);
};
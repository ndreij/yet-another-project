import {WS_CONNECTION_INIT, 
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_ON_MESSAGE,
  WS_SEND_MESSAGE
} from '../constants';
import { TFeedTypes, TServerFeedMessage } from '../../utils/interfaces/feed';

export interface IWSConnectionRequest {
  readonly type: typeof WS_CONNECTION_INIT
  readonly payload: { url: string, type: TFeedTypes };
}

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWSClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: Event;
}

export interface IWSOnMessage {
  readonly type: typeof WS_ON_MESSAGE;
  readonly payload: TServerFeedMessage;
}

export interface IWSSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
}

export type TWsActions =
    | IWSConnectionRequest 
    | IWSConnectionSuccess 
    | IWSConnectionError
    | IWSOnMessage 
    | IWSSendMessage
    | IWSClose 
    | IWSConnectionClosed;

export type TwsConnectParams = { 
  url: string, 
  type: TFeedTypes 
};

export const wsConnect = ({ url, type }: TwsConnectParams): IWSConnectionRequest => ({ 
  type: WS_CONNECTION_INIT, 
  payload: { url, type } 
});

export const wsConnectionSuccess = (): IWSConnectionSuccess => ({ 
  type: WS_CONNECTION_SUCCESS 
});

export const wsConnectionError = (error: string): IWSConnectionError => ({ 
  type: WS_CONNECTION_ERROR, 
  payload: error });

export const wsDisconnect = (): IWSClose => ({ 
  type: WS_CONNECTION_CLOSE 
});

export const wsConnectionClosed = (event: Event): IWSConnectionClosed => ({ 
  type: WS_CONNECTION_CLOSED, 
  payload: event 
});

export const wsOnMessage = (data: TServerFeedMessage): IWSOnMessage => ({ 
  type: WS_ON_MESSAGE, 
  payload: data 
});
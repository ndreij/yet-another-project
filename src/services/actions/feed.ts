import { PROCESS_ORDERS, SET_TYPE } from '../constants/';
import { TFeedTypes, TServerFeedMessage } from '../../utils/interfaces/feed';

interface IProcessOrdersPayload {
  data: TServerFeedMessage,
  type: TFeedTypes
}
export interface IProcessOrders {
  readonly type: typeof PROCESS_ORDERS;
  readonly payload: IProcessOrdersPayload;
}

export interface ISetType {
  readonly type: typeof SET_TYPE;
  readonly payload: TFeedTypes;
}

export type TFeedActionTypes =
  | IProcessOrders
  | ISetType;

export const processOrders = ({ data, type }: IProcessOrdersPayload): IProcessOrders => ({
  type: PROCESS_ORDERS,
  payload: { data, type }
});
export const setType = (type: TFeedTypes): ISetType => ({
  type: SET_TYPE,
  payload: type
});
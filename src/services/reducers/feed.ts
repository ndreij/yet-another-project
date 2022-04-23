import { TFeedActions } from '../actions/feed';
import { IOrderDetails } from '../../utils/interfaces/order';
import { PROCESS_ORDERS } from '../constants';

export type TFeedState = {
  orders: IOrderDetails[] | null;
  total: number | null;
  totalToday: number | null;
};

const initialState: TFeedState = {
  orders: null,
  totalToday: null,
  total: null,
};

export const feedReducer = ( state: TFeedState = initialState, action: TFeedActions
): TFeedState => {
  switch (action.type) {
    case PROCESS_ORDERS: {
      const { data: { orders, total, totalToday }, type } = action.payload;
      const checkedOrders = type === 'personal' ? orders.reverse().map((order) => ({ ...order, _isOwn: true })) : orders
      return {
        ...state,
        orders: checkedOrders,
        totalToday,
        total,
      };
    }
    default:
      return state;
  }
};

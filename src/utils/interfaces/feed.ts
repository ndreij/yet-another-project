import { IOrderDetails } from './order';

export type TFeedTypes = string | undefined;

export type TServerFeedMessage = {
  total: number;
  orders: Array<IOrderDetails>;
  totalToday: number;
  success: boolean;
};
export type TOrderStatus = 'done' | 'created' | 'canceled' | 'pending';

export interface IOrderDetails {
  _id: string;
  number: number;
  ingredients: string[];
  name: string;
  status: TOrderStatus;
  createdAt: string;
  updatedAt: string;
  _isOwn?: boolean;
}
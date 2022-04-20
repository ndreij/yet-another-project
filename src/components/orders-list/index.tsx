import { FC } from 'react';

import { OrderCard } from '../order-card';
import { IOrderDetails } from '../../utils/interfaces/order';
import { useWebSocket } from '../../services/hooks';

type TOrdersListProps = {
  orders?: IOrderDetails[] | null,
  showOrderStatus?: boolean
};

export const OrdersList: FC<TOrdersListProps> = ({
  orders,
  showOrderStatus,
}) => {
  useWebSocket();  
  return (
      <>
      {orders && orders.map((order) => (
        <OrderCard
          orderDetails={order}
          key={order._id}
          showOrderStatus={showOrderStatus}
        />
      ))}
      {!orders && (
        <div className={"text text_type_main-default"}>Загрузка заказов</div>
      )}
      </>
  );
};

OrdersList.defaultProps = {
  orders: null,
  showOrderStatus: false,
};
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../../redux/reducers/orderHistorySlice';

const TradeOrderHistoryTab = () => {
  const dispatch = useDispatch();
  const orderHistory = useSelector((state) => state.orderHistory.orderHistory);
  const loading = useSelector((state) => state.orderHistory.loading);
  const error = useSelector((state) => state.orderHistory.error);

  useEffect(() => {
    // Fetch order history when the component mounts
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  if (loading) {
    return <div>Loading order history...</div>;
  }

  if (error) {
    return <div>Error fetching order history. Please try again later.</div>;
  }

  return (
    <div>
      <h1>Trade Order History Tab</h1>
      {orderHistory.map((order) => (
        <div key={order.id}>
          <p>
            Order ID:
            {order.id}
          </p>
          <p>
            Product Name:
            {order.productName}
          </p>
          <p>
            Quantity:
            {order.quantity}
          </p>
          <p>
            Total Price: $
            {order.totalPrice}
          </p>
          {/* Add more details based on your order structure */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TradeOrderHistoryTab;

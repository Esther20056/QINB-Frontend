import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/shipping/')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Orders Loaded Successfully',
          text: 'The shipping orders have been successfully loaded!',
        });
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Orders',
          text: 'There was an error fetching the orders. Please try again later.',
        });
      });
  }, []);

  return (
    <div>
      <h2>Shipping Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h3>{order.full_name}</h3>
              <p>Status: {order.shipping_status}</p>
              <p>Tracking Number: {order.tracking_number}</p>
              <Link to={`/orders/${order.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;

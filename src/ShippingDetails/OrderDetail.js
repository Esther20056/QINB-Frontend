import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/shipping/${id}/`)
      .then(response => {
        setOrder(response.data);
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Order Loaded Successfully',
          text: 'The order details have been successfully loaded!',
        });
      })
      .catch(error => {
        console.error('There was an error fetching the order!', error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Order',
          text: 'There was an error fetching the order details. Please try again later.',
        });
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        order && (
          <div>
            <h2>Order Detail for {order.full_name}</h2>
            <p>Status: {order.shipping_status}</p>
            <p>Tracking Number: {order.tracking_number}</p>
            <p>Estimated Delivery Date: {order.estimated_delivery_date}</p>
            <Link to={`/orders/${order.id}/update`}>Update Status</Link>
          </div>
        )
      )}
    </div>
  );
};

export default OrderDetail;

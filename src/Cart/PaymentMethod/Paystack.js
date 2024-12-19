import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'

const Paystack = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); 
  const [email, setEmail] = useState(user ? user.email : '');  
  const navigate = useNavigate()

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const [integerPart, decimalPart] = formattedPrice.split('.');
    const formattedIntegerPart = new Intl.NumberFormat().format(integerPart);
    return `${formattedIntegerPart}.${decimalPart}`;
  };

  useEffect(() => {
    const storedAmount = localStorage.getItem('totalAmount');
    if (storedAmount) {
      setTotalAmount(storedAmount);
    }
  }, []);

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: totalAmount * 100, 
    publicKey: 'pk_test_48947716d824b0b00eb3d43ae2ca69845f95efe8', 
  };

  const handleSuccess = (response) => {
    console.log('Payment success response:', JSON.stringify(response, null, 2)); 

    const transactionReference = response.reference;
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;
    
    if (!userId) {
        console.error('User ID is missing!');
        return;
    }

    const paymentData = {
      user: userId, 
      email: user ? user.email : '',  
      amount: totalAmount,
      reference: transactionReference,
    };

    // console.log("Payment data sent to backend:", paymentData);  

    fetch('http://localhost:8000/paystackdata/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from backend:', data); 
        if (data.message) {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: data.message,
          });navigate('/')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: data.error || 'Unknown error occurred',
          });
        }
      })
      .catch(error => {
        console.error('Error posting payment data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'There was an error while processing your payment.',
        });
      });
};

  const handleClose = () => {
    console.log('Payment popup closed');
    Swal.fire({
      icon: 'info',
      title: 'Payment closed!',
    });
  };
  

  return (
    <div className="bank-transfer">
       {totalAmount && (
        <p className="payment-total-amount">
          <strong>Total Amount: #{formatPrice(totalAmount)}</strong>
        </p>
      )}
      <h3 className="pay-with-bank-note">How to pay with Paystack:</h3>
      <ul>
        <li>Click the "Pay Now" button to proceed to Paystack's payment gateway.</li>
        <li>Choose your preferred payment method (Card, Bank, USSD, etc.) on the Paystack page.</li>
        <li>Complete the authentication process as required by your payment method.</li>
        <li>Once payment is successful, you will be redirected back to our site.</li>
      </ul>
    
      <PaystackButton
        {...config}
        text="Pay Now with Paystack"
        onSuccess={handleSuccess}
        onClose={handleClose}
        className='paystack-btn'
      />
      <p className="contact-info">
        For inquiries, please contact us at: <strong className='payment-strong-small'>Qinbfashionaccessories@gmail.com</strong> or call <strong className='payment-strong-small'>0810 718 2900</strong>.
      </p>
    </div>
  );
};

export default Paystack;

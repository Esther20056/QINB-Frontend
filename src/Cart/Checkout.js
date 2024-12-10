import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';
import Swal from 'sweetalert2';

function Checkout() {
const { cart, calculateTotalPrice } = useCart();
const [shippingMethod, setShippingMethod] = useState('Land Courier');
const [duties, setDuties] = useState(0);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const formatPrice = (price) => {
const formattedPrice = parseFloat(price).toFixed(2);
const [integerPart, decimalPart] = formattedPrice.split('.');
const formattedIntegerPart = new Intl.NumberFormat().format(integerPart);
return `${formattedIntegerPart}.${decimalPart}`;
};

const calculateTotalWeight = () => {
return cart.reduce((totalWeight, item) => totalWeight + item.weight * item.quantity, 0);
};

useEffect(() => {
const totalPrice = calculateTotalPrice();
if (shippingMethod === 'Air Courier') {
if (totalPrice < 100000) setDuties(50000);
else if (totalPrice >= 100000 && totalPrice < 1000000) setDuties(88000);
else if (totalPrice >= 1000000) setDuties(150000);
} else if (shippingMethod === 'Land Courier') {
const totalWeight = calculateTotalWeight();
if (totalPrice < 100000 || totalWeight < 2) setDuties(4500);
else if (totalPrice >= 100000 && totalPrice <= 500000) setDuties(15000);
else setDuties(20000);
}
}, [shippingMethod, calculateTotalPrice, cart]);

const handleShippingMethodChange = (e) => {
setShippingMethod(e.target.value);
};

async function handleSubmit(e) {
e.preventDefault();
setLoading(true);
setErrors({});
const formData = new FormData(e.currentTarget);
try {
await axios.post('http://localhost:8000/ordersummary/', formData);

Swal.fire({
icon: 'success',
title: 'Success!',
text: '🎉 Congratulations! You have successfully placed your order. 🎉',
customClass: {
popup: 'custom-swal-popup',
title: 'custom-swal-title',
content: 'custom-swal-content',
confirmButton: 'custom-swal-confirm'
},
confirmButtonText: 'Continue'
});
} catch (err) {
if (err.response && err.response.data) {
let errorMessages = '';
for (let key in err.response.data) {
if (err.response.data.hasOwnProperty(key)) {
errorMessages += `${key}: ${err.response.data[key]}\n`;
}
}
Swal.fire({
icon: 'error',
title: 'Submission Failed!',
text: errorMessages.trim() || 'Something went wrong. Please try again later.',
customClass: {
popup: 'custom-swal-popup',
title: 'custom-swal-title',
content: 'custom-swal-content',
confirmButton: 'custom-swal-confirm'
},
confirmButtonText: 'Okay'
});
} else {
Swal.fire({
icon: 'error',
title: 'Error!',
text: 'Something went wrong. Please try again later.',
customClass: {
popup: 'custom-swal-popup',
title: 'custom-swal-title',
content: 'custom-swal-content',
confirmButton: 'custom-swal-confirm'
},
confirmButtonText: 'Okay'
});
}
} finally {
setLoading(false);
}
}
  return (
    <div className="checkout-main-container">
      {/* Cart Items Information */}
      <div className="cart-checkout-item-details">
        <div className="Billing-Address order">ORDER SUMMARY</div>
        <div className="cart-checkout-items-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-checkout-item">
              <div className="checkout-image-container">
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.name}
                  className="cart-item-image"
                />
                <h5>{item.name}</h5>
              </div>
              <p>Quantity: {item.quantity}</p>
              <p>Size: {item.size}</p>
              <p>Weight: {item.weight} kg</p>
            </div>
          ))}
          <div className="checkout-total">
            <h3>Total: #{formatPrice(calculateTotalPrice())}</h3>
          </div>
        </div>
      </div>
      {/* Form */}
      <form action="" className="form-checkout" onSubmit={handleSubmit}>
        <section className="BillingAndDelivery">
          {/* Billing section */}
          <div className="billingsection-maincontainer">
            <div className="Billing-Address">Billing Form</div>
            <div className="billingsection">
              <div className="form-checkout-input-container">
                <input
                  type="text"
                  name="billing_firstName"
                  placeholder="First Name"
                  className="checkout-input"
                />

                <input type="text" name='billing_secondName' placeholder='Last Name' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="email" name='email' placeholder='Email' className='checkout-input'/>
                <input type="text" name='phone_number' placeholder='Phone Number' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='billing_country' placeholder='Country' className='checkout-input'/>
                <input type="text" name='billing_state' placeholder='State' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='billing_homeaddress' placeholder='House address' className='checkout-input'/>
                <input type="text" name='billing_postalcode' placeholder='Postal Code' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <textarea type="text" name='billing_ordernote' placeholder='Order note' className='checkout-input order-textarea'/>
              </div>
            </div>
          </div>
          {/* Delivery section */}
          <div className="billingsection-maincontainer">
            <div className="Billing-Address">Delivery Form</div>
            <div className="billingsection">
              <div className="form-checkout-input-container">
                <input type="text" name='delivery_firstName' placeholder='First Name' className='checkout-input' 
              />
                <input type="text" name='delivery_secondName' placeholder='Last Name' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="email" name='delivery_email' placeholder='Email' className='checkout-input'/>
                <input type="text" name='delivery_phoneNumber' placeholder='Phone Number' className='checkout-input' />
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='delivery_country' placeholder='Country' className='checkout-input'/>
                <input type="text" name='delivery_state' placeholder='State' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='delivery_homeaddress' placeholder='Suburb' className='checkout-input'/>
                <input type="text" name='delivery_postalcode' placeholder='Postal Code' className='checkout-input'/>
              </div>
            </div>
          </div>
        </section>
        {/* Shipping Method */}
        <section className="shipping-method section">
          <div className="Billing-Address order">Shipping Method</div>
          <div id="shipping-method-input-container" className="shipment">
            <p className="method-p">Select shipping method</p>
            <select
            name='shippingMethod'
              value={shippingMethod}
              onChange={handleShippingMethodChange}
              className="method"
            >
              <option value="Land Courier" className="shipping-option">Land Courier</option>
              <option value="Air Courier" className="shipping-option">Air Courier</option>
            </select>
          </div>
        </section>
        {/* DutiesAndTaxes */}
        <section className="dutiesAndtaxes section">
          <div className="Billing-Address order">Duties and Taxes</div>
          <div id="shipping-method-input-container">
            <div className="duties-input-container">
              <input
                name="duties"
                type="radio"
                value={duties}
                checked={duties > 0}
                readOnly
              />
              <label htmlFor="">Duties and Taxes: #{formatPrice(duties)}</label>
            </div>
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="qinbTC">
          <div className="terms-conditions">
            <p>By proceeding with your order, you agree to our <Link to="/terms" className='Qinb-terms-of-sales'>Terms of Sale and Privacy Policy</Link></p>
          </div>
        </section>
        <button type="submit" className="submit-button">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout


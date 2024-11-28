import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';
import PaystackPop from '@paystack/inline-js';

function Checkout() {
  const { cart, calculateTotalPrice } = useCart();
  const formatPrice = (price) => {
            const formattedPrice = parseFloat(price).toFixed(2);
            const [integerPart, decimalPart] = formattedPrice.split('.');
            const formattedIntegerPart = new Intl.NumberFormat().format(integerPart);
             return `${formattedIntegerPart}.${decimalPart}`;
         };
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
          <form action="" className="form-checkout">
           <section className="BillingAndDelivery">
                   {/* Billing section */}
            <div className="billingsection-maincontainer">
            <div className="Billing-Address">Billing Form</div>
            <div className="billingsection">
              <div className="form-checkout-input-container">
                <input type="text" name='' placeholder='First Name' className='checkout-input'/>
                <input type="text" name='' placeholder='Last Name' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="email" name='' placeholder='Email' className='checkout-input'/>
                <input type="text" name='' placeholder='Phone Number' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='' placeholder='Country' className='checkout-input'/>
                <input type="text" name='' placeholder='State' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='' placeholder='Suburb' className='checkout-input'/>
                <input type="text" name='' placeholder='Postal Code' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <textarea type="text" name='' placeholder='Order note' className='checkout-input order-textarea'/>
              </div>
            </div>
            </div>
            {/* Delivery section */}
            <div className="billingsection-maincontainer">
            <div className="Billing-Address">Delivery Form</div>
            <div className="billingsection">
              <div className="form-checkout-input-container">
                <input type="text" name='' placeholder='First Name' className='checkout-input'/>
                <input type="text" name='' placeholder='Last Name' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="email" name='' placeholder='Email' className='checkout-input'/>
                <input type="text" name='' placeholder='Phone Number' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='' placeholder='Country' className='checkout-input'/>
                <input type="text" name='' placeholder='State' className='checkout-input'/>
              </div>
              <div className="form-checkout-input-container">
                <input type="text" name='' placeholder='Suburb' className='checkout-input'/>
                <input type="text" name='' placeholder='Postal Code' className='checkout-input'/>
              </div>
            </div>
            </div>
           </section>
            {/* shipping method */}
            <section className="shipping-method section">
            <div className="Billing-Address order">Shipping Method</div>
              <div id="shipping-method-input-container" className='shipment'>
                  <p className='method-p'>Select shipping method</p>
                  <select name="" id="" className="method">
                    <option value="land" className="shipping-option">Land Courier</option>
                    <option value="air" className="shipping-option">Air Courier</option>
                  </select>
              </div>
            </section>
            {/* DutiesAndTaxes */}
            <section className="dutiesAndtaxes section">
            <div className="Billing-Address order">Duties and Taxes</div>
            <div id="shipping-method-input-container">
                    <div className="duties-input-container">
                    <input name='' type="radio" />
                    <label htmlFor="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam.</label>
                    </div>
                    <div className="duties-input-container">
                    <input name='' type="radio" />
                    <label htmlFor="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam.</label>
                    </div>
              </div>
            </section>
              {/* Terms and Conditions */}
              <section className="qinbTC">
              <div className="terms-conditions">
                                 <p>By proceeding with your order, you agree to our <Link to="/terms" className='Qinb-terms-of-sales'>Terms of Sale and Privacy Policy</Link></p>
             </div>
              </section>
          </form>
        </div>
    );
}

export default Checkout

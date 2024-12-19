import React from 'react';
import './Shipping.css'

const ShippingDetails = () => {
  return (
    <div className='shipping-info-main-container'>
      <h1 className='h1-h3'>Shipping Details for QINB Fashion & Accessories Products</h1>

      <section>
        <h2 className='h1-h3'>Order Preparation Time</h2>
        <p className='shipping-p'>
        QINB Fashion & Accessories requires <strong>2-3 business days</strong> to prepare your order shipment. 
          This includes properly packaging your QINB Fashion & Accessories order with the appropriate materials. 
          We also aim to minimize environmental impact by using recycled packaging materials 
          wherever possible.
        </p>
      </section>

      <section>
        <h2 className='h1-h3'>Shipping Time</h2>
        <p className='shipping-p'>
          Once your order is ready, a tracking number with other shipping details will be sent to your registered email address.
        </p>
        <ul>
          <li><strong>Ground shipments:</strong> QINB Fashion & Accessories packages typically arrive within <strong>1 to 3 business days</strong> after shipment.</li>
          <li><strong>For shipments outside Lagos:</strong>
            <ul>
              <li><strong>Within the West Zone of Nigeria:</strong> Delivery takes <strong>1 working day</strong>.</li>
              <li><strong>Beyond the West Zone:</strong> Delivery takes <strong>2-4 working days</strong>.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2 className='h1-h3'>In Case of Damage or Non-Delivery</h2>

        <h4 className='h1-h3'>If Your Item Arrives Damaged</h4>
        <p className='shipping-p'>
          If your QINB Fashion & Accessories item(s) arrive damaged, please notify us within <strong>1 business days</strong> of delivery. To help us assist you promptly, please provide:
          <ul>
            <li>Images of the damaged package and the damaged items.</li>
            <li>The packing slip that accompanied your QINB Fashion & Accessories order.</li>
          </ul>
          Once we receive this information, we will assist you with a replacement or refund.
        </p>

        <h4 className='h1-h3'>If You Did Not Receive Your Package</h4>
        <p className='shipping-p'>
          If your QINB Fashion & Accessories package was not delivered as indicated by the tracking number, please notify <strong>QINB Fashion & Accessories Customer Service</strong> via email at Qinbfashionaccessories@gmail.com within <strong>2 business days</strong> of the scheduled delivery date.  will file a lost package claim on your behalf. The claim process typically takes <strong>4-10 business days</strong>. Claims made outside this timeframe will not be eligible for replacement or store credit.
        </p>
      </section>
    </div>
  );
};

export default ShippingDetails;

import React, { useEffect, useState } from 'react';
import '../Cart.css';

function BankTransfer() {
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const storedAmount = localStorage.getItem('totalAmount');
    if (storedAmount) {
      setTotalAmount(storedAmount);
    }
  }, []);
  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const [integerPart, decimalPart] = formattedPrice.split('.');
    const formattedIntegerPart = new Intl.NumberFormat().format(integerPart);
    return `${formattedIntegerPart}.${decimalPart}`;
    };

  return (
    <div className='bank-transfer'>
         {totalAmount && (
          <p className="payment-total-amount">
            <strong>Total Amount: #{formatPrice(totalAmount)}</strong>
          </p>
        )}
        <h3 className='pay-with-bank-note'>How to pay with Bank Transfer:</h3>
<ul>
    <li>Copy the bank account details below to initiate the transfer.</li>
    <li>Use your bank app, USSD code, or ATM machine to complete the transfer.</li>
    <li>Once payment is completed, send a screenshot or photo of your payment receipt to <strong className='payment-strong-small'>Qinbfashionaccessories@gmail.com</strong> for verification.</li>
    <li>Include the name under which the order was placed in the subject line of the email for quick identification.</li>
    <li>If you face any issues, feel free to contact us via email or reach out to our customer support team for assistance.</li>
    <li>We will confirm your payment within 24 hours and process your order once payment is verified.</li>
</ul>
    
<div className="bank-details">
    <small className='payment-strong-small'>Account Name: QINB Fashion and Accessories</small>
    <small className='payment-strong-small'>Bank: Zenith Bank</small>
    <small className='payment-strong-small'>Account Number: 2356786543</small>
</div>
<p className="note">Please ensure you use the correct account number when making the transfer. Failure to provide the correct details may delay your order processing.</p>
<p className="contact-info">For any inquiries or assistance, please contact us at: <strong className='payment-strong-small'>Qinbfashionaccessories@gmail.com</strong> or call us at <strong className='payment-strong-small'>0810 718 2900</strong>.</p>

    </div>
  )
}

export default BankTransfer
import React, { useState } from 'react';

function FAQ() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Handle accordion click event
  const handleAccordionClick = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const faqItems = [
    {
      question: "What types of products do you offer?",
      answer: "At QINB Fashion and Accessories, we offer a wide variety of luxury products, including rings, necklaces, bracelets, earrings, watches, fragrances, and chains. Our collection is designed for both men and women, offering timeless elegance and stylish accessories for every occasion."
    },
    {
      question: "Do you offer custom designs?",
      answer: "Yes, we specialize in custom designs! Whether you're looking for a unique engagement ring, a bespoke necklace, or a personalized bracelet, we work closely with you to bring your vision to life. Our custom designs are available for jewelry, watches, and chains."
    },
    {
      question: "How do I place an order?",
      answer: "Placing an order with us is simple. Browse our collection on our website, select your desired items—whether jewelry, watches, fragrances, or chains—and proceed to checkout. If you need assistance, our customer support team is available to guide you through the process."
    },
    {
      question: "What payment methods do you accept?",
      answer: (
        <div>
          <p>We accept two secure payment methods for your convenience:</p>
          <ul>
            <li><strong>Paystack:</strong> Pay via credit or debit card, mobile money, or bank payments using the Paystack payment gateway, supporting both local and international transactions.</li>
            <li><strong>Direct Bank Transfer:</strong> Choose direct bank transfer at checkout and complete your payment through your bank. Once the payment is made, send us the confirmation to confirm your order.</li>
          </ul>
        </div>
      )
    },
    {
      question: "How do I use Paystack to pay?",
      answer: "To pay with Paystack, simply select Paystack as your payment method at checkout. You will be redirected to a secure page where you can complete your payment via debit/credit card, mobile money, or bank transfer."
    },
    {
      question: "What is Direct Bank Transfer and how do I use it?",
      answer: "If you prefer to pay via bank transfer, select the Direct Bank Transfer option during checkout. After placing your order, you will receive our bank details to complete the payment. Once done, send us the transaction details for verification."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order has been dispatched, you will receive an email with a tracking number. You can use this number to track your order online and stay updated on its status until it reaches you."
    },
    {
      question: "What is your return policy?",
      answer: (
        <div>
          <p>Our return policy allows you to return your product within 24 hours after delivery. If there are any issues with the item, please contact us within 24 hours. After this period, no complaints or returns will be accepted.</p>
          <p>We recommend you carefully inspect the product upon delivery to ensure it meets your expectations.</p>
        </div>
      )
    },
    {
      question: "Do you offer a trust guarantee?",
      answer: (
        <div>
          <p>We take pride in providing high-quality products and exceptional customer service. All of our items are carefully inspected before shipping to ensure they meet the highest standards. We believe in building trust with our customers and are committed to providing a secure, reliable shopping experience.</p>
          <p>Your satisfaction is our priority, and we stand behind every product we sell.</p>
        </div>
      )
    },
    {
      question: "How long will it take to receive my order?",
      answer: "Once your order is confirmed and processed, we typically ship orders within 1-3 business days. Delivery times vary depending on your location and the shipping method chosen at checkout."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on your location."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping for a small additional fee. Simply select the gift wrapping option at checkout."
    },
    {
      question: "How do I take care of my jewelry, watches, and accessories?",
      answer: "Avoid exposing items to harsh chemicals, moisture, or direct sunlight. Clean them regularly with a soft cloth and store them in a jewelry box or pouch."
    },
    {
      question: "What happens if an item is out of stock?",
      answer: "If an item is out of stock, you can sign up for restock alerts. We also offer similar product recommendations."
    },
  
  ];

  return (
    <div className="FAQ">
      <h3>At QINB Fashion and Accessories, we offer luxury items for every occasion and style!</h3>
      <p>From elegant jewelry and timeless watches to signature fragrances and stylish chains, QINB has everything you need to enhance your style. Whether you're shopping for yourself or for a loved one, our diverse collection includes products for both men and women. Below, you’ll find answers to common questions about our collections, payment methods, and how to place and track your orders.</p>
      <div className="wrapper">
        <div className="text-container">
          <div className="accordion" id="accordionExample">
            {faqItems.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    onClick={() => handleAccordionClick(index)}
                    aria-expanded={activeAccordion === index ? 'true' : 'false'}
                    aria-controls={`collapse${index}`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${activeAccordion === index ? 'show' : ''}`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {typeof item.answer === 'string' ? item.answer : item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

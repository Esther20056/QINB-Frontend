import React, { useState } from 'react';
import './FooterLinks.css';

function Contact() {
  return (
    <div className="contact-us">
     <div>
     <h3>Contact Us</h3>
     <p>We’re here to assist you with any questions or concerns about our exquisite collection of jewelry, watches, fragrances, and chains. Whether you're shopping for yourself or looking for the perfect gift, our team is ready to help. Reach out to us, and we'll respond as quickly as possible to ensure your shopping experience is exceptional.</p>

     </div>
      <div className="contact-info">
        <h3>Get in Touch</h3>
        <p><strong>Email: </strong>Qinbfashionaccessories@gmail.com</p>
        <p><strong>Phone: </strong>0810 718 2900</p>
        <p><strong>WhatsApp: </strong>+234 802 3695 106</p>
        <p><strong>Address: </strong>No 2, Mubarak busstop, along Alagbole-Akute Road, Lagos state.</p>
      </div>
    </div>
  );
}

export default Contact;

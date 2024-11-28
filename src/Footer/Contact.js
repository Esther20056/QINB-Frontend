import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import './FooterLinks.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send('service_81km87x', 'template_fcjtiln', formData, '6dP85jFUkwHJrGA72')
      .then((response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Message sent successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setFormData({ name: '', email: '', message: '' }); 
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send message. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Email.js error:', error);
      });
  };
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

      <div>
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit} className='contact-form'>
          <div className='input-container'>
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          </div>
           <div className='input-container'>
           <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
           </div>
           <div className='input-container'>
           <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
           </div>
          <button type="submit" id='contact-form-btn'>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

import React from 'react';
import './FooterLinks.css';

const careersList = [
  {
    title: 'Jewelry Designer',
    description: 'Creates unique and stylish jewelry pieces, working closely with the design team to craft new collections that reflect the QINB brand’s aesthetic.'
  },
  {
    title: 'Product Manager',
    description: 'Oversees the development and enhancement of QINB’s jewelry, watches, fragrances, and chains, ensuring the product offerings align with customer desires and market trends.'
  },
  {
    title: 'Customer Support Specialist',
    description: 'Provides exceptional service to customers, addressing inquiries and resolving issues to ensure a seamless shopping experience across all QINB products.'
  },
  {
    title: 'Marketing Manager',
    description: 'Develops and executes marketing strategies to promote QINB’s products and brand identity, leveraging both digital and traditional channels to increase visibility and sales.'
  },
  {
    title: 'E-commerce Manager',
    description: 'Manages QINB’s online store, optimizing the user experience, overseeing product listings, and ensuring smooth transactions for customers purchasing jewelry, watches, and accessories.'
  },
  {
    title: 'Visual Merchandiser',
    description: 'Responsible for creating visually appealing displays that highlight QINB’s latest collections, both in-store and online, to captivate and inspire customers.'
  },
  {
    title: 'Business Development Manager',
    description: 'Identifies new growth opportunities, fosters partnerships, and develops strategies to expand QINB’s market presence, both domestically and internationally.'
  }
];


function Career() {
  return (
    <div className='careers' style={{gap: '1rem'}}>
      <h3>Join the QINB Fashion & Accessories Team</h3>
      {careersList.map((career, index) => (
        <div key={index} className='career-item'>
          <h5>{career.title}</h5>
          <p>{career.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Career;


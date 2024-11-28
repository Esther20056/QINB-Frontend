import React from 'react'
import {Link} from 'react-router-dom'

function AboutQINB() {
  return (
    <div className="about">
      <h3>About QINB Fashion and Accessories</h3>
      <p>
        QINB Fashion and Accessories is your destination for stylish wristwatches, jewelry, chains, and fragrances for both men and women. We offer a curated collection that blends timeless elegance with modern luxury, designed to upgrade your personal style. Whether you need a classic watch, elegant jewelry, or a unique fragrance, QINB has something special for every occasion. <br />
        We take pride in offering products from world-renowned brands and skilled artisans. Our watches range from classic to innovative designs, while our jewelry collection features both bold statement pieces and minimalist designs. We also offer a variety of chains, necklaces, rings, and bracelets to complement any outfit. <br />
        Our fragrance collection includes scents for every mood, from fresh daytime notes to rich evening fragrances. Every item we offer is crafted with the utmost care and attention to detail. <br />
        At QINB, we believe that accessories are an essential expression of personal style. Our mission is to create luxurious, functional pieces that inspire confidence and stand the test of time—offered at an accessible price. <br />
        Customer satisfaction is our top priority. Whether shopping in-store or online, we offer personalized service to help you find the perfect piece. We also prioritize sustainability, working with partners who share our values of fairness and respect for the environment.
      </p>
      <p>
        Explore QINB Fashion and Accessories—where style meets luxury and every detail matters.
      </p>
      <button id='about-btn'><Link to='/category/newproducts'>Shop</Link></button>
    </div>
  )
}

export default AboutQINB

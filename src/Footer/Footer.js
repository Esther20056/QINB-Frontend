import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaTiktok } from "react-icons/fa6"; import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa"; import { FaYoutube } from "react-icons/fa";
import QFALogo from "../../src/Assets/QFALogo.png"

function Footer() {
  return (
    <footer className="sea-footer">
      <div className="content">
        {/* Logo display section */}
        <div className="footer-contents-wrapper" style={{flexBasis: "25%"}}>
          <div className="logo-media-wrapper">
          <div className="logo-container">
          <img src={QFALogo} alt="QFALogo" />
          <p className="logo-name">QINB Fashion <strong className='logo-name-strong'>&</strong> Accessories</p>
        </div>
        <div className="media-container">
        <p className='header-text' >Social Medias</p>
          <ul className='social-platforms'>
            <li><Link to='https://www.tiktok.com/@allfashionsupplierinlag?_t=8rdJznr88IB&_r=1'><FaTiktok/></Link></li>
            <li><Link to='https://www.facebook.com/share/18qkffwu1V/'><FaFacebookF /></Link></li>
            <li><Link to='https://www.instagram.com/invites/contact/?igsh=172pbbwaz9145&utm_content=vybnvlz '><FaSquareInstagram /></Link></li>
            <li><Link to='https://youtube.com/@qinbmarketingsolutions?si=FWK6Rk_UEDElWJdy'><FaYoutube /></Link></li>
          </ul>
        </div>
          </div>
        </div>
     {/* Shop Section */}
     <div className="footer-contents-wrapper">
          <p className='header-text'>Our Shop</p>
          <ul className='quick-links'>
           <li>&gt; <Link to="/" style={{ marginLeft: "0.5rem" }}>Home</Link></li>
            <li>&gt; <Link to="category/watches/men" style={{ marginLeft: "0.5rem" }}>Men's Watches</Link></li>
            <li>&gt; <Link to="category/watches/women" style={{ marginLeft: "0.5rem" }}>Women's Watches</Link></li>
            <li>&gt; <Link to="category/jewelry/unisex" style={{ marginLeft: "0.5rem" }}>Jewelry</Link></li>
            <li>&gt; <Link to="category/Chain/unisex" style={{ marginLeft: "0.5rem" }}>Chains</Link></li>
            <li>&gt; <Link to="category/fragrances/unisex" style={{ marginLeft: "0.5rem" }}>Fragrances</Link></li>
          </ul>
        </div>
        {/* Customer Care Section 1 */}
        <div className="footer-contents-wrapper">
          <p className='header-text'>Customer Care</p>
          <ul className='quick-links'>
            <li>&gt; <Link to="/blog" style={{ marginLeft: "0.5rem" }}>Blog</Link></li>
            <li>&gt; <Link to="/contact" style={{ marginLeft: "0.5rem" }}>Contact Us</Link></li>
            <li>&gt; <Link to="/signup" style={{ marginLeft: "0.5rem" }}>My Account</Link></li>
            <li>&gt; <Link to="/faq" style={{ marginLeft: "0.5rem" }}>FAQ</Link></li>
            <li>&gt; <Link to="/shipping" style={{ marginLeft: "0.5rem" }}>Shipping</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="footer-contents-wrapper">
          <p className='header-text'>Our Company</p>
          <ul className='quick-links'>
            <li>&gt; <Link to="/about" style={{ marginLeft: "0.5rem" }}>About Us</Link></li>
            <li>&gt; <Link to="/career" style={{ marginLeft: "0.5rem" }}>Careers</Link></li>
            <li>&gt; <Link to="/T&C" style={{ marginLeft: "0.5rem" }}>Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

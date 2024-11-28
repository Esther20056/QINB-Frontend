import React from 'react'
import QFALogo from "../../src/Assets/QFALogo.png"
import './Newsletter.css'

function Newsletter() {
  return (
    <div className='newsletter-main-container'>
          <div className="newsletter-logo-container">
            <img src={QFALogo} alt="" />
          </div>
          <div className="newslettter-form-container">
            <p className='newslettter-p'>Stay in the know with exclusive offers and new arrivals in fragrances, watches, jewelry, and chains. Subscribe now for the latest trends and timeless elegance!</p>
            <form action="">
              <div className="newslettter-form">
              <input className='newslettter-input' type="text" placeholder='Your Email'/>
              <button className='newsletter-button'>Submit</button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default Newsletter
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PopUp.css';

function PopUp(){
  const [isVisible, setIsVisible] = useState(false);
  const showPopUp = () => {
    setIsVisible(true);
  };
  const hidePopUp = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      showPopUp();
    }, 90000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup">
          <h2>We value your feedback!</h2>
          <p>Please take a moment to rate your experience.</p>
          <div className="popup-btn-container">
          <button className='popup-button ' onClick={hidePopUp}>Close</button>
          <button className='popup-button '><Link to='/rateus'>Rate</Link></button>
          </div>
        </div>
      </div>
    )
  );
};

export default PopUp;

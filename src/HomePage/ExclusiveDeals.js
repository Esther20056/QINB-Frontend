import React from 'react';
import ExclusiveDealsBanner from '../Assets/ExclusiveDealsBanner.png'
import { Link } from 'react-router-dom';
import './NewArrival.css'

function ExclusiveDeals() {
    return (
      <div className="exclusive-deals">
      <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <img
              src={ExclusiveDealsBanner}
              className='exclusive-deals-img'
              alt="exclusive deals"
            />
            <div className="exclusive-carousel-body">
              <div  className="exclusive-text-container-for-big-screen">
                   
            <h4 className="exclusive-deal-header">Fresh Finds at QINB Fashion & Accessories</h4>
            <p className='exclusive-p'>💎 New Watches, Jewelry & Fragrances Just In! 💎</p>
           <p className='exclusive-p'>🌟 Be the First to Explore Our Latest Collection 🌟</p>
            <p className='exclusive-p'>Free Shipping on Orders Over #500, 000.00</p>
            <p className='exclusive-p'>Enjoy 10% OFF + Free Shipping on Your First Order!</p>
            </div>
            <div className="exclusive-text-container-for-small-screen">
            <h4 className="exclusive-deal-header">Fresh Finds at QINB Fashion</h4>
<p className='exclusive-p'>💎 New Watches, Jewelry & Fragrances! 💎</p>
<p className='exclusive-p'>🌟 Explore Our Latest Collection 🌟</p>
<p className='exclusive-p'>Free Shipping on Orders Over #500,000</p>
<p className='exclusive-p'>10% OFF + Free Shipping on First Orders!</p>

            </div>
            <button className='exclusive-deals-btn'><Link to="/exclusivedeals-products">Shop Now</Link></button>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    );
}

export default ExclusiveDeals


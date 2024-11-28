import React from 'react'
import {Link} from 'react-router-dom'
import QFABanner from '../Assets/QFABanner.png'
import QFABannerTwo from '../Assets/QFABannerTwo.png'
import QFABG from '../Assets/QFABG.png'
import QFASMB from '../Assets/QFASMB.png'
import QFASMB2 from '../Assets/QFASMB2.png'
import QFAB1 from '../Assets/QFAB1.png'
import './Banner.css'

function Banner() {
  return (
    <div className='banner-container'>
         <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators list-unstyled">
                <li
                    data-bs-target="#carouselId"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="First slide"
                     
                ></li>
                <li
                    data-bs-target="#carouselId"
                    data-bs-slide-to="1"
                    aria-label="Second slide"
                    className='list-style'
                ></li>
                <li
                    data-bs-target="#carouselId"
                    data-bs-slide-to="2"
                    aria-label="Third slide"
                    
                ></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                    <img
                        src={QFABanner}
                        alt="First-Banner"
                        className='banner-img big-screen-img'
                    />
                     <img
                        src={QFAB1}
                        alt="First-Banner"
                        className='small-screen-img'
                    /> 
                    <div className="carousel-body">
                        <div className="carousel-body-small-screen-text">
                            <h3 className='watches-h3'>Sophistication Meets Nigeria Pride</h3>
                            <p className='watches-p'>Explore premium watches,fragrances and jewelry for those who value the finest</p>
                        </div>
                        <button className='carousel-body-button'><Link to='/category/newproducts'>Shop Now</Link></button>
                    </div>
                </div>
                <div class="carousel-item">
                    <img
                        src={QFABG}
                        className='banner-img big-screen-img'
                        alt="Second slide"
                    />
                       <img
                        src={QFASMB}
                        alt="First-Banner"
                        className='small-screen-img'
                    /> 
                      <div className="carousel-body">
                      <div className="carousel-body-small-screen-text">
                            <h3 className='jewelry-h3'>Refined Unisex Jewelry</h3>
                            <p className='jewelry-p'>Timeless pieces crafted for everyone. Discover jewelry that adds elegance to any style.</p>
                        </div>
                        <button className='carousel-body-button slide-two-btn'><Link to='/category/newproducts'>Shop Now</Link></button>
                    </div>
                </div>
                <div class="carousel-item">
                    <img
                        src={QFABannerTwo}
                        class="w-100 d-block"
                        alt="Third slide"
                        className='banner-img big-screen-img'
                    />
                          <img
                        src={QFASMB2}
                        alt="First-Banner"
                        className='small-screen-img'
                    /> 
                        <div className="carousel-body">
                        <div className="carousel-body-small-screen-text">
                            <h3 className='fragrance-h3'>Signature Fragrances</h3>
                            <p className='fragrance-p'>Experience luxury scents that captivate. Discover our exclusive range of perfumes for every occasion</p>
                        </div>
                        <button className='carousel-body-button slide-three-btn'><Link to='/category/newproducts'>Shop Now</Link></button>
                    </div>
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide="prev"
            >
                <span class="carousel-control-prev-icon carousel-control-button" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide="next"
            >
                <span class="carousel-control-next-icon carousel-control-button" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
         </div>
         
    </div>
  )
}

export default Banner
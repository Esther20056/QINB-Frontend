import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import './Testimony.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function Testimony() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/retrieve-rate/')
      .then((response) => {
        console.log('Data fetched from API:', response.data); 
        setRatings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the ratings!', error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="customer-testimony">
      <div className="customer-testimony-container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <h2>What our customers are saying about Qinb Fashion & Accessories.</h2>
            <p>
              Our customers are at the heart of our success. Read firsthand accounts of their experiences with our brand and discover why they’re passionate about shopping with us.
            </p>
          </div>
          <div className="col-lg-7">
            {loading ? (
              <p>Loading...</p>
            ) : (
              ratings.length === 0 ? (
                <p>No testimonials available</p>
              ) : (
                <Swiper
                  modules={[Pagination, Autoplay]}
                  loop={true}
                  speed={600}
                  autoplay={{ delay: 9000 }}
                  slidesPerView="auto"
                  pagination={{ clickable: true }}
                >
                  {ratings.map((rating) => (
                    <SwiperSlide key={rating.id} className="swiper-slide">
                      <article className="customer_testimonies-item">
                        <div className="testimony_wrapper">
                          <div>
                            <h3>{rating.user_first_name}</h3> 
                            <div className="rating_stars">
                              {[...Array(rating.star)].map((_, index) => (
                                <i key={index} className="bi bi-star-fill"></i>
                              ))}
                              {[...Array(5 - rating.star)].map((_, index) => (
                                <i key={index} className="bi bi-star"></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p>
                          <i className="bi bi-quote right-icon"></i>
                          <span>{rating.message}</span>
                          <i className="bi bi-quote left-icon"></i>
                        </p>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimony;

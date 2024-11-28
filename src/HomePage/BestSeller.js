import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import './NewArrival.css';

function BestSeller() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const itemsPerSlide = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/product/productCategoryIdentifier/bestseller');
        setData(response.data); 
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentProducts = data.slice(currentIndex, currentIndex + itemsPerSlide);

  const goToNext = () => {
    if (currentIndex + itemsPerSlide < data.length) {
      setCurrentIndex(currentIndex + itemsPerSlide);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - itemsPerSlide >= 0) {
      setCurrentIndex(currentIndex - itemsPerSlide);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="newarrivals">
      <h2 className="newarrivals-h2">Our best sellers</h2>      
      <div className="slider-container">
        <div className="newarrival-item">
          {currentProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={`http://localhost:8000/${item.image}`}
              promo_price={item.promo_price}
              current_price={item.price}
              size={item.size}
            />
          ))}
        </div>
      </div>

      <div className="slider-controls">
        <button 
          onClick={goToPrevious} 
          disabled={currentIndex === 0} 
          className="slider-button prev-button">
          Previous
        </button>

        <button 
          onClick={goToNext} 
          disabled={currentIndex + itemsPerSlide >= data.length} 
          className="slider-button next-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default BestSeller;




import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Item from './Item';
import './NewArrival.css'

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('query'); 

  useEffect(() => {
    if (query) {
      axios
        .get('http://localhost:8000/products/search/', {
          params: { query },
        })
        .then((response) => {
          setSearchResults(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching search results:', error); 
        });
    }
  }, [query]); 

  return (
    <div className="newarrivals">
      <h2 className='newarrivals-h2'>Search Results for {query}</h2>
      <ul className='newarrival-item'>
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <li key={item.id}>
              <Item
                id={item.id}
                name={item.name}
                image={`http://localhost:8000/${item.image}`}
                promo_price={item.promo_price}
                current_price={item.price}
                size={item.size}
              />
            </li>
          ))
        ) : (
          <p>No products found for your search.</p> 
        )}
      </ul>
    </div>
  );
}

export default SearchResults;

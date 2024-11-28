import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

function Item(props) {
  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const [integerPart, decimalPart] = formattedPrice.split('.');
    const formattedIntegerPart = new Intl.NumberFormat().format(integerPart);

    // Combined formatted integer part with decimal part
    return `${formattedIntegerPart}.${decimalPart}`;
  };

  return (
    <div className="items">
      <div className="img-display">
        <Link to={`/product/${props.name.toLowerCase()}`}>
          <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} />
        </Link>
      </div>
      <div className="ps">
        <p id="name">{props.name}</p>
        <p id="size">{props.size}</p>
        <div className="items-prices">
          <div className="items-price-current">#{formatPrice(props.current_price)}</div>
        </div>
      </div>
    </div>
  );
}

export default Item;

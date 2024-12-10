import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, calculateTotalPrice } = useCart();
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/productdetails/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);
  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const [integerPart, decimalPart] = formattedPrice.split('.');
    const formattedIntegerPart = new Intl.NumberFormat().format(integerPart);
    return `${formattedIntegerPart}.${decimalPart}`;
  };
  const handleRemove = (id) => {
    removeFromCart(id);
    Swal.fire({
      icon: 'info',
      title: 'Item Removed',
      text: 'The item has been removed from your cart.',
    });
  };
  const handleClearCart = () => {
    localStorage.removeItem('cart');
    Swal.fire({
      icon: 'warning',
      title: 'Cart Cleared',
      text: 'Your cart has been cleared.',
    }).then(() => {
    });
  };
  const handleCheckout = async () => {
    const cartData = {
      items: cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
      total: calculateTotalPrice(),
    };

    try {
      const response = await axios.post('http://localhost:8000/cartItemStorage/', cartData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Redirecting to Checkout',
      }).then(() => {
        navigate('/checkout');
      });
    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Checkout Error',
        text: 'There was an error processing your checkout. Please try again.',
      });
    }
  };

  return (
    <div className="cartpage-main-container">
      <bold className="back-btn"><Link to="/category/newproducts">Back to shop</Link></bold>
      <div className="cart-page">
        <h3>Shopping Cart</h3>
        <div className="cart-header">
          <div className="cart-header-item">Product</div>
          <div className="cart-header-item">Quantity</div>
          <div className="cart-header-item">Price</div>
          <div className="cart-header-item">Total</div>
        </div>
        <ul className="empty-cart-container">
          {cart.length === 0 ? (
            <li>Your cart is empty</li>
          ) : (
            cart.map((item) => (
              <li key={item.id} className="cart-item-li">
                <div className="cart-item">
                  <div className="cart-item-details">
                    <div className="cart-item-column cart-item-img-display">
                    <img
                    src={`http://localhost:8000/${item.image}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                      {item.name}
                    </div>
                    <div className="cart-item-column">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      />
                    </div>
                    <div className="cart-item-column">
                      #{formatPrice(item.price)}
                    </div>
                    <div className="cart-item-column">
                      #{formatPrice(item.price * item.quantity)}
                    </div>
                    <div className="cart-item-actions">
                      <button className='cart-item-actions-btn' onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Total Price */}
        <div className="cart-total">
          <h3>Total: #{formatPrice(calculateTotalPrice())}</h3>
        </div>
         <div className="dutiesandtaxes-text">Duties, taxes and delivery fee will be calculated at checkout</div>
        {/* Checkout Button */}
        <div className="cart-checkout-btn">
          <button id='checkout-btn' onClick={handleCheckout} disabled={cart.length === 0}>
            Proceed to Checkout
          </button>
        </div>

        {/* Clear Cart Button */}
        <div className="cart-clear-btn">
          <button id='checkout-btn' style={{marginTop: '1rem'}} onClick={handleClearCart} disabled={cart.length === 0}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
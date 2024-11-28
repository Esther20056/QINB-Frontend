import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Cart/CartContext'; 
import Swal from 'sweetalert2';
import './ItemDisplay.css';

function ItemsDisplay() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();  
    const navigate = useNavigate();
    const formatPrice = (price) => {
        const formattedPrice = parseFloat(price).toFixed(2);
        const [integerPart, decimalPart] = formattedPrice.split('.');
        const formattedIntegerPart = new Intl.NumberFormat().format(integerPart);   
        // Combined the formatted integer part with the decimal part
        return `${formattedIntegerPart}.${decimalPart}`;
      };
    const fetchProducts = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/productdetails/${id}`); 
            setProduct(response.data); 
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchProducts(id);
        }
    }, [id]);

    const handleAddToCart = (product) => {
        addToCart(product);
        Swal.fire({
            title: 'Item Added!',
            text: `${product.name} has been added to your cart.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate('/cart');
        });
    };
    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="display">
            <small><Link to='/' style={{color: "#000"}}>Back</Link></small>
            <div className="main-display">
                <div className="display-one">
                    <div className="display-img-list">
                        <img src={`http://localhost:8000${product?.image}`} alt={product?.name} />
                        <img src={`http://localhost:8000${product?.image}`} alt={product?.name} />
                    </div>
                    <div className="display-img">
                        <img src={`http://localhost:8000${product?.image}`} alt={product?.name} />
                    </div>
                </div>
                <div className="display-two">
                    <h3>{product?.name}</h3>
                    <div className="display-description">{product?.description}</div>
                    <div className="display-size">{product?.size}</div>
                    <div className="display-one-current-price">#{formatPrice(product.price)}</div>
                    {/* Add to Cart Button */}
                    <button className='img-display-button' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
            </div>
            <div className="specification-container">
                <h3>Specifications</h3> 
                <div className="specification">
                    <p>Category</p>
                    <p className='specification-p'>{product?.category}</p>
                </div>
                <div className="specification">
                    <p>Gender</p>
                    <p className='specification-p'>{product?.subcategory}</p>
                </div>
                <div className="specification">
                    <p>Shade</p>
                    <p className='specification-p'>{product?.color}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemsDisplay;

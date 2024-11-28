import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchProductsByCategory } from './fetchProductsByCategory';
import './ProductCategory.css'
import Item from './Item';
const ProductCategory = () => {
    const { category, subcategory } = useParams(); //to get category and subcategory from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProductsByCategory(category, subcategory); // Pass category and subcategory directly
                setProducts(data);
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [category, subcategory]); // For fetching products whenever category or subcategory changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='product-category-wrapper'>
            <h2 className='product-category-display-h2'>
                {subcategory ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} ` : ''}
                {category.charAt(0).toUpperCase() + category.slice(1)} Products
            </h2>
            <div className='product-category-display'>
            {products.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={`http://localhost:8000/${item.image}`}
              current_price={item.price}
              size={item.size}
            />
          ))}
            </div>
        </div>
    );
};

export default ProductCategory;


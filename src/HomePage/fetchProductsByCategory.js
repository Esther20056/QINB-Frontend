import axios from 'axios';

const API_URL = 'http://localhost:8000/product/category/';

export const fetchProductsByCategory = async (category, subcategory) => {
    try {
        const url = subcategory ? `${API_URL}${category}/${subcategory}/` : `${API_URL}${category}/`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


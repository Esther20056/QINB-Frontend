import React from 'react'
import chain from '../Assets/chain.jpeg'
import watches from '../Assets/watches.jpeg'
import jewelry from '../Assets/jewelry.jpeg'
import perfume from '../Assets/perfume.jpeg'
import { Link } from 'react-router-dom'
import './CategoryHighLights.css'

function CategoryHighLights() {
  return (
    <div className="category-main">
         <h2>Shop by category</h2>
    <div className='category-highlights'>
         <div className="category-highlights-link-wrapper">
            <Link to='/category/watches/unisex' id='category-a'>
            <img src={watches} alt="category-highlights-img"/>
            <p className="category-highlights-p">Watches</p>
            </Link>
         </div>
         <div className="category-highlights-link-wrapper">
            <Link to="category/jewelry/unisex" id='category-a'>
            <img src={jewelry} alt="category-highlights-img"/>
            <p className="category-highlights-p">Jewelry</p>
            </Link>
         </div>
         <div className="category-highlights-link-wrapper">
            <Link to='category/Chain/unisex' id='category-a'>
            <img src={chain} alt="category-highlights-img"/>
            <p className="category-highlights-p">Chains</p>
            </Link>
         </div>
         <div className="category-highlights-link-wrapper">
            <Link to='category/fragrances/unisex' id='category-a'>
            <img src={perfume} alt="category-highlights-img"/>
            <p className="category-highlights-p">Fragrances</p>
            </Link>
         </div>
    </div>
    </div>
  )
}

export default CategoryHighLights
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'; 
import Spinner from './Spinner'; 
import Topheader from './Topheader/Topheader';
import Login from './Account/Login';
import SignUp from './Account/SignUp';
import Home from './HomePage/Home';
import ProductCategory from './HomePage/ProductCategory';
import Footer from './Footer/Footer';
import ItemsDisplay from './HomePage/ItemsDisplay';
import Contact from './Footer/Contact';
import Career from './Footer/Career';
import FAQ from './Footer/FAQ';
import Cart from './Cart/Cart';
import { CartProvider } from './Cart/CartContext';
import ExclusiveDealsProducts from './HomePage/ExclusiveDealsProducts';
import SearchResults from './HomePage/SearchResult';
import Checkout from './Cart/Checkout';
import AboutQINB from './Footer/AboutQinb';
import TermsAndConditions from './Footer/TermsAndConditions';
import Blog from './Blog/Blog';
import BlogPosts from './Blog/BlogPosts';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        {isLoading && <Spinner />}       
        <Topheader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/about" element={<AboutQINB />} />
          <Route path="/T&C" element={<TermsAndConditions />} />
          <Route path="/exclusivedeals-products" element={<ExclusiveDealsProducts />} />
          {/* PRODUCT SECTION STARTS HERE */}
          <Route path="/category/:category/:subcategory?" element={<ProductCategory />} />
          <Route path='/product/:id' element={<ItemsDisplay />} />
          {/* PRODUCT SECTION ENDS HERE */}
          {/* BLOG SECTION STARTS HERE */}
          <Route path="/blog/:id" element={<BlogPosts />} />
          <Route path="/blog" element={<Blog />} />
          {/* BLOG SECTION ENDS HERE */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

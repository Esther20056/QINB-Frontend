import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import "./Topheader.css";
import Flag from 'react-world-flags';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import axios from 'axios'
import QFALogo from "../../src/Assets/QFALogo.png"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Topheader() {
  const [barsOpen, setBarsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Nigeria");
  const [selectedFlag, setSelectedFlag] = useState("NG");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8000/save-country/')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCountriesList(response.data);
        } else {
          alert("No countries data available.");
        }
      })
      .catch((error) => {
        alert("Error fetching data from the server. Please try again.");
        console.error("There was an error fetching the country data!", error);
      });
    const storedCountry = localStorage.getItem("selectedCountry");
    const storedFlag = localStorage.getItem("selectedFlag");

    if (storedCountry && storedFlag) {
      setSelectedCountry(storedCountry);
      setSelectedFlag(storedFlag);
    }
  }, []);

  const handleFlagClick = () => {
    setShowForm(!showForm);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowForm(false);
    axios.post('http://localhost:8000/save-country/', {
      country: selectedCountry,
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonText: 'OK',
        });
        localStorage.setItem("selectedCountry", selectedCountry);
        localStorage.setItem("selectedFlag", selectedFlag);
      })
      .catch(error => {
        console.error("There was an error submitting the form!", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error submitting the form!',
          confirmButtonText: 'Try Again',
        });
      });
  };

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    if (countryName === "Nigeria") {
      setSelectedFlag("NG");
    } else if (countryName === "United States") {
      setSelectedFlag("US");
    } else if (countryName === "United Kingdom") {
      setSelectedFlag("GB");
    } else if (countryName === "Canada") {
      setSelectedFlag("CA");
    } else if (countryName === "Eritrea") {
      setSelectedFlag("ER");
    } else if (countryName === "Germany") {
      setSelectedFlag("DE");
    } else if (countryName === "France") {
      setSelectedFlag("FR");
    } else if (countryName === "Australia") {
      setSelectedFlag("AU");
    } else if (countryName === "Japan") {
      setSelectedFlag("JP");
    } else if (countryName === "South Korea") {
      setSelectedFlag("KR");
    } else if (countryName === "South Africa") {
      setSelectedFlag("ZA");
    } else if (countryName === "Brazil") {
      setSelectedFlag("BR");
    } else if (countryName === "Italy") {
      setSelectedFlag("IT");
    } else if (countryName === "Singapore") {
      setSelectedFlag("SG");
    } else if (countryName === "Switzerland") {
      setSelectedFlag("CH");
    } else if (countryName === "New Zealand") {
      setSelectedFlag("NZ");
    } else if (countryName === "Mexico") {
      setSelectedFlag("MX");
    } else if (countryName === "Russia") {
      setSelectedFlag("RU");
    } else if (countryName === "Turkey") {
      setSelectedFlag("TR");
    } else if (countryName === "Malaysia") {
      setSelectedFlag("MY");
    } else if (countryName === "Saudi Arabia") {
      setSelectedFlag("SA");
    } else if (countryName === "Belgium") {
      setSelectedFlag("BE");
    }
    setSelectedCountry(countryName);
  };

  const toggleHamburger = () => {
    setBarsOpen(!barsOpen);
  };
  const closeHamburgerMenu = () => {
    setBarsOpen(false);
  };
  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get('http://localhost:8000/products/search/', {
        params: { query }
      });
      setSearchResults(response.data);
      // Redirect to where the search results page is.
      navigate(`/search-results?query=${query}`);
    } catch (error) {
      alert('Error fetching search results:', error);
      setSearchResults([]);
    }
  };
  const handleChange = (event) => {
    setQuery(event.target.value); //To Update query state
  };

  return (
    <div className="main-container">
      <div className='topheader-container big-screen'>
        <div className="first-header">
          <p className="shipping-text">Free shipping to Nigeria on all orders above ₦161,765</p>
        </div>
        <div className="second-header">
          <div className="logo-container">
            <img src={QFALogo} alt="QFALogo" />
            <p className="logo-name">QINB Fashion <strong className='logo-name-strong'>&</strong> Accessories</p>
          </div>
          <div className="searchbar-container">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={query}
              onChange={handleChange}
            />
            <button aria-label="Search" onClick={handleSearch}>
              <IoIosSearch />
            </button>
          </div>
          <ul className="icons-container">
            <li><Link to="/login" aria-label="User Profile"><BiUser /></Link></li>
            <li><Link to="/cart" aria-label="Shopping Bag"><FiShoppingCart /></Link></li>
            <li>
              <div onClick={handleFlagClick} style={{ cursor: 'pointer', marginTop: '20px' }}>
                <Flag code={selectedFlag} alt={selectedCountry} className='flag' />
              </div>
            </li>
          </ul>
        </div>
        <div className="third-container">
          <ul className="links-container">
            <li>
              <Link
                to="/"
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Home
                {hoveredLink === "home" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
              </Link>
            </li>
            <li>
              <Link
                to="/category/newproducts"
                onMouseEnter={() => setHoveredLink("new")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                New
                {hoveredLink === "new" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
              </Link>
            </li>
            <li>
              <div class="dropdown">
                <button
                  class="btn border border-0 dropdown-button"
                  type="button"
                  id="menDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseEnter={() => setHoveredLink("men")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Men
                  {hoveredLink === "men" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                </button>
                <div class="dropdown-menu" aria-labelledby="triggerId">
                  <Link to="/category/watches/men" class="dropdown-item">All Watches</Link>
                  <Link to="/category/watches/unisex" class="dropdown-item">Gender-Neutral Watches</Link>
                  <Link to="category/automaticwatches/men" class="dropdown-item">Automatic Watches</Link>
                  <Link to="category/diamondwatches/men" class="dropdown-item">Diamond Watches</Link>
                  <Link to="category/nflwatches/men" class="dropdown-item">NFL Watches</Link>
                  <Link to="category/C&S/men" class="dropdown-item">Cases & storages</Link>
                  <Link to="category/accessories/men" class="dropdown-item">Accessories</Link>
                  <Link to="category/clearance/men" class="dropdown-item">Clearance</Link>
                </div>
              </div>
            </li>
            <li>
              <div class="dropdown">
                <button
                  class="btn border border-0 dropdown-button"
                  type="button"
                  id="womenDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseEnter={() => setHoveredLink("women")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Women
                  {hoveredLink === "women" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                </button>
                <div class="dropdown-menu" aria-labelledby="triggerId">
                  <Link to="category/watches/women" class="dropdown-item">All Watches</Link>
                  <Link to="/category/watches/unisex" class="dropdown-item">Gender-Neutral Watches</Link>
                  <Link to="category/automaticwatches/women"
                    class="dropdown-item">Automatic Watches</Link>
                  <Link to="category/diamondwatches/women" class="dropdown-item">Diamond Watches</Link>
                  <Link to="category/nflwatches/women" class="dropdown-item">NFL Watches</Link>
                  <Link to="category/C&S/women" class="dropdown-item">Cases & storages</Link>
                  <Link to="category/accessories/women" class="dropdown-item">Accessories</Link>
                  <Link to="category/clearance/women" class="dropdown-item">Clearance</Link>
                </div>
              </div>
            </li>
            <li>
              <div class="dropdown">
                <button
                  class="btn border border-0 dropdown-button"
                  type="button"
                  id="jewelryDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseEnter={() => setHoveredLink("jewelry")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Jewelry      {hoveredLink === "jewelry" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}  </button>
                <div class="dropdown-menu" aria-labelledby="triggerId">
                  <Link to="category/jewelry/men" class="dropdown-item">Men's Jewelry</Link>
                  <Link to="category/jewelry/women" class="dropdown-item">Women's Jewelry</Link>
                  <Link to="category/jewelry/unisex" class="dropdown-item">Gender-Neutral Jewelry</Link>
                </div>
              </div>
            </li>
            <li>
              <div class="dropdown">
                <button
                  className="btn border border-0 dropdown-button"
                  type="button"
                  id="chainsDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseEnter={() => setHoveredLink("chains")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Chains
                  {hoveredLink === "chains" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                </button>
                <div class="dropdown-menu" aria-labelledby="triggerId">
                  <Link to="category/Chain/men" class="dropdown-item">Men's Chains</Link>
                  <Link to="category/Chain/women" class="dropdown-item">Women's Chains</Link>
                  <Link to="category/Chain/unisex" class="dropdown-item">Gender-Neutral Chains</Link>
                </div>
              </div>
            </li>
            <li>
              <div class="dropdown">
                <button
                  className="btn border border-0 dropdown-button"
                  type="button"
                  id="fragrancesDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseEnter={() => setHoveredLink("fragrances")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Fragrances
                  {hoveredLink === "fragrances" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                </button>
                <div class="dropdown-menu" aria-labelledby="triggerId">

                  <Link to="category/fragrances/men" class="dropdown-item">Men's Fragrances</Link>
                  <Link to="category/fragrances/women" class="dropdown-item">Women's Fragrances</Link>
                  <Link to="category/fragrances/unisex" class="dropdown-item">Gender-Neutral Fragrances</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Conditionally render the form */}
        {showForm && (
          <div className='select-flag-container'>
            <h4 className='select-flag-container-h3'>Select Your Country</h4>
            <form onSubmit={handleFormSubmit} className='select-flag-container-form'>
              <div className="select-flag-input-container">
                <label htmlFor="country" className='select-flag-container-form-label'>Country:</label>
                <select id="country" name="country" onChange={handleCountryChange} value={selectedCountry}>
                  {countriesList.length > 0 ? (
                    countriesList.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </select>
              </div>
              <button type="submit" className='select-flag-container-form-button'><strong>Submit</strong></button>
            </form>
            {selectedCountry && (
              <div>
                <h4 className='select-flag-container-form-label'>Selected Country: {selectedCountry}</h4>
                <Flag code={selectedFlag} alt={selectedCountry} style={{ width: '6rem', height: '6rem', objectFit: 'contain' }} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className='topheader-container small-screen'>
        <ul className="small-screen-first-header">
          <p className="shipping-text">Free shipping to Nigeria on all orders above ₦161,765</p>
        </ul>
        <div className="second-header">
          <div className="hamburger" onClick={toggleHamburger}>
            {/* Hamburger Icon */}
            ☰
          </div>
          <div className="logo-container">
            <img src={QFALogo} alt="QFALogo" />
            <p className="logo-name">QINB Fashion <strong className='logo-name-strong'>&</strong> Accessories</p>
          </div>
          <ul className="icons-container">
            <li><Link to="/login" aria-label="User Profile"><BiUser /></Link></li>
            <li><Link to="/cart" aria-label="Shopping Bag"><FiShoppingCart /></Link></li>
          </ul>
        </div>
        {/* Hamburger Menu */}
        <div className={`hamburger-menu ${barsOpen ? 'open' : ''}`}>
          <div className="third-container small-screen-third-container">
            <ul className="links-container">
              <li>
                <Link
                  to="/"
                  onClick={() => setBarsOpen(false)}
                  onMouseEnter={() => setHoveredLink("home")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Home
                  {hoveredLink === "home" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                </Link>
              </li>
              <li>
                <Link
                  to="/category/newproducts"
                  onClick={() => setBarsOpen(false)}
                  onMouseEnter={() => setHoveredLink("new")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  New
                  {hoveredLink === "new" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                </Link>
              </li>
              <li>
                <div className="dropdown">
                  <button
                    className="btn border border-0 dropdown-button"
                    type="button"
                    id="menDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onMouseEnter={() => setHoveredLink("men")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Men
                    {hoveredLink === "men" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="triggerId">
                    <Link onClick={() => setBarsOpen(false)} to="category/watches/men" className="dropdown-item">All Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/watches/unisex" class="dropdown-item">Gender-Neutral Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/automaticwatches/men" className="dropdown-item">Automatic Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/diamondwatches/men" className="dropdown-item">Diamond Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/nflwatches/men" className="dropdown-item">NFL Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/C&S/men" className="dropdown-item">Cases & storages</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/accessories/men" className="dropdown-item">Accessories</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/clearance/men" className="dropdown-item">Clearance</Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <button
                    className="btn border border-0 dropdown-button"
                    type="button"
                    id="womenDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onMouseEnter={() => setHoveredLink("women")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Women
                    {hoveredLink === "women" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="triggerId">
                    <Link onClick={() => setBarsOpen(false)} to="category/watches/women" className="dropdown-item">All Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/watches/unisex" class="dropdown-item">Gender-Neutral Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/automaticwatches/women" class="dropdown-item">Automatic Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/diamondwatches/women" className="dropdown-item">Diamond Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/nflwatches/women" className="dropdown-item">NFL Watches</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/C&S/women" className="dropdown-item">Cases & storages</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/accessories/women" className="dropdown-item">Accessories</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/clearance/women" className="dropdown-item">Clearance</Link>
                  </div>
                </div>
              </li>
              <li>
                <div class="dropdown">
                  <button
                    className="btn border border-0 dropdown-button"
                    type="button"
                    id="jewelryDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onMouseEnter={() => setHoveredLink("jewelry")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Jewelry      {hoveredLink === "jewelry" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}  </button>
                  <div className="dropdown-menu" aria-labelledby="triggerId">
                    <Link onClick={() => setBarsOpen(false)} to="category/jewelry/men" className="dropdown-item">Men's Jewelry</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/jewelry/women" className="dropdown-item">Women's Jewelry</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/jewelry/unisex" class="dropdown-item">Gender-Neutral Jewelry</Link>
                  </div>
                </div>
              </li>
              <li>
                <div class="dropdown">
                  <button
                    className="btn border border-0 dropdown-button"
                    type="button"
                    id="chainsDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onMouseEnter={() => setHoveredLink("chains")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Chains
                    {hoveredLink === "chains" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="triggerId">
                    <Link onClick={() => setBarsOpen(false)} to="category/Chain/men" className="dropdown-item">Men's Chains</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/Chain/women" className="dropdown-item">Women's Chains</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/Chain/unisex" class="dropdown-item">Gender-Neutral Chains</Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <button
                    className="btn border border-0 dropdown-button"
                    type="button"
                    id="fragrancesDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onMouseEnter={() => setHoveredLink("fragrances")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Fragrances
                    {hoveredLink === "fragrances" ? <FaAngleDown id="angles" /> : <FaAngleUp id="angles" />}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="triggerId">

                    <Link onClick={() => setBarsOpen(false)} to="category/fragrances/men" className="dropdown-item">Men's Fragrances</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/fragrances/women" className="dropdown-item">Women's Fragrances</Link>
                    <Link onClick={() => setBarsOpen(false)} to="category/fragrances/unisex" class="dropdown-item">Gender-Neutral Fragrances</Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* searchbar for-small screen */}
      <div className="searchbar-container for-small-screen">
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={handleChange}
        />
        <button aria-label="Search" onClick={handleSearch}>
          <IoIosSearch />
        </button>
      </div>
    </div>
  );
}

export default Topheader;


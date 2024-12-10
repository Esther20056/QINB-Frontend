import React, { useState } from 'react';
import './Account.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isPasswordValid = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError('Password must be at least 8 characters long, with one uppercase letter and one number.');
      return;
    }
    setIsLoading(true); 

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:8000/login/', formData);
      const { token } = response.data;  

      localStorage.setItem('userToken', token); 
      Swal.fire({
        title: 'Success!',
        text: 'Login successful',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate("/checkout");
      });
    } catch (err) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (err.response && err.response.data) {
        const errorResponse = err.response.data;
        errorMessage = errorResponse.non_field_errors ? errorResponse.non_field_errors[0] : errorMessage;
      } else if (!err.response) {
        errorMessage = 'Network Error: Failed to connect to the server.';
      }

      setError(errorMessage);
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false); // End loading indicator
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };
  const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
  return (
    <div className="account-main-container">
      <h2 className="account-main-container-h2">Sign In</h2>
      <p className="account-main-container-p">Please fill in the information below:</p>
      <form className="account-form" onSubmit={handleLogin}>
        <div className="account-input-main-container">
          <input
            type="text"
            className="input-fields"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="account-input-main-container">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="input-fields"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="password-visibility-toggle"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        {/* Password validation message */}
        {password && !isPasswordValid && (
          <div className="password-error-message">
            <p>Password must be at least 8 characters, contain one uppercase letter, and one number.</p>
          </div>
        )}
        <button
          className="account-button"
          disabled={!isPasswordValid}
          type="submit"
        >
          Login
        </button>
        <div className="dont-have-an-account">
          <p className="dont-have-an-account-p">Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
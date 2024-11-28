import React, { useState } from 'react';
import './Account.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function SignUp() {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const formatPhoneNumber = (input) => {
    const cleaned = ('' + input).replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
    setPhoneNumber(formatted);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    formatPhoneNumber(input);
  };

  const isPasswordValid = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const isPhoneNumberValid = /^\d{4} \d{3} \d{4}$/.test(phoneNumber);

  const validateForm = (formData) => {
    let valid = true;
    const newErrors = {};
    const phone = formData.get('phone_number');
    if (!phone) {
      newErrors.phone_number = 'Phone number is required';
      valid = false;
    } else if (!isPhoneNumberValid) {
      newErrors.phone_number = 'Phone number must be in the format: 1234 567 8901';
      valid = false;
    }
    if (!formData.get('first_name')) {
      newErrors.first_name = 'First name is required';
      valid = false;
    }
    if (!formData.get('last_name')) {
      newErrors.last_name = 'Last name is required';
      valid = false;
    }
    const email = formData.get('email');
    if (!email) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (!isPasswordValid) {
      newErrors.password = 'Password must be at least 8 characters, contain one uppercase letter, and one number.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!validateForm(formData)) {
      return; 
    }
    setLoading(true);
    setErrors({});

    try {
      await axios.post('http://localhost:8000/signup/', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: '🎉 Congratulations! You have successfully! 🎉',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm',
        },
        confirmButtonText: 'Continue',
      }).then(() => {
        navigate('/');
      });
    } catch (err) {
      if (err.response && err.response.data) {
        let errorMessages = '';
        for (let key in err.response.data) {
          if (err.response.data.hasOwnProperty(key)) {
            errorMessages += `${key}: ${err.response.data[key]}\n`;
          }
        }
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed!',
          text: errorMessages.trim() || 'Something went wrong. Please try again later.',
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            content: 'custom-swal-content',
            confirmButton: 'custom-swal-confirm',
          },
          confirmButtonText: 'Okay',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            content: 'custom-swal-content',
            confirmButton: 'custom-swal-confirm',
          },
          confirmButtonText: 'Okay',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-main-container">
      <h2 className="account-main-container-h2">Register</h2>
      <p className="account-main-container-p">Please fill in the information below:</p>
      <form action="" className="account-form signup" onSubmit={handleSubmit}>
        <div className="account-input-main-container">
          <input type="text" className="input-fields" name="first_name" placeholder="First name" />
          {errors.first_name && <span className="error">{errors.first_name}</span>}
        </div>
        <div className="account-input-main-container">
          <input type="text" className="input-fields" name="last_name" placeholder="Last name" />
          {errors.last_name && <span className="error">{errors.last_name}</span>}
        </div>
        <div className="account-input-main-container">
          <input type="text" className="input-fields" name="email" placeholder="Email" />
          {errors.email && <span className="error">{errors.email}</span>}
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
          <button type="button" className="password-visibility-toggle" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {/* Password validation message */}
        {!isPasswordValid && password.length > 0 && (
          <div className="password-error-message">
            <p>Password must be at least 8 characters, contain one uppercase letter, and one number.</p>
          </div>
        )}
        <div className="account-input-main-container">
          <input
            type="text"
            className="input-fields"
            name="phone_number"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            maxLength={13}
          />
          {errors.phone_number && <span className="error">{errors.phone_number}</span>}
        </div>
        <button className="account-button" type="submit" disabled={loading || !isPasswordValid || !isPhoneNumberValid}>
          {loading ? 'Submitting...' : 'Sign Up'}
        </button>
        <div className="dont-have-an-account">
          <p className="dont-have-an-account-p">Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

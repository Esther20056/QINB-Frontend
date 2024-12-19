import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function WebsiteRatingForm() {
  const [star, setRating] = useState(null); 
  const [post, setPost] = useState('');
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handlePostChange = (event) => {
    setPost(event.target.value); 
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
  } else {
    let formData = new FormData();
    formData.append("star", star); 
    formData.append("message", post);
    formData.append("user", user.id);

    axios.post("http://localhost:8000/rateus/", formData)
      .then((res) => {
        navigate("/");
        Swal.fire({
          icon: 'success',
          title: 'Rating submitted successfully',
          text: 'Thank you for sharing your experience with us',
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        const errorMessages = err?.response?.data;
        let errorText = '';

        for (let key in errorMessages) {
          errorText += `${key}: ${errorMessages[key]}\n`;
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorText,
          showConfirmButton: true
        });
      });
  }
};

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)} 
          style={{ cursor: 'pointer', fontSize: '2.5rem' }}
        >
          {i <= star ? '★' : '☆'} 
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='rateus-container'>
      <h2>Share your experience with us</h2>
      <form onSubmit={handleSubmit} className='rateus-form'>
        <div>{renderStars()}</div>
        <div>
          <p className='rateus-p'>Your rating: {star}</p> 
        </div>
        <input type="hidden" name="star" value={star || ''} />
        <textarea
          name="message"
          value={post}
          onChange={handlePostChange}
          placeholder="Leave a comment"
          className=' rateus-textarea'
        />
        <button className='rateus-btn' type="submit" disabled={!star}> 
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default WebsiteRatingForm;

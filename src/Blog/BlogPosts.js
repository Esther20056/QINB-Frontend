import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import Post from './BlogArray';
import './Blog.css'

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const foundPost = Post.find(post => post.id === parseInt(id));

    if (foundPost) {
      setPost(foundPost);
      setLoading(false);
    } else {
      setError('Post not found');
      setLoading(false);
    }
  }, [id]);

  const renderContent = (content) => {
    if (typeof content === 'object' && Array.isArray(content)) {
      return content.map((item, index) => (
        <div key={index} className='Blog-details-container'>
          <h4>{item.faceShape}</h4>
          <p><strong></strong> {item.characteristics}</p>
          <h5>Best Earrings:</h5>
          <ul>
            {item.bestEarrings.map((earring, earringIndex) => (
              <li key={earring.id || earringIndex}>{earring}</li>
            ))}
          </ul>
              <div className="image-container">
                <div className="img">
                <img src={item.image} alt="" id='blogpost-img'/>
                <p>{item.image_Title}</p>
              </div>
              <div className="img">
                <img src={item.image2} alt="" id='blogpost-img'/>
                <p>{item.image_Title2}</p>
              </div>
              <div className="img">
                <img src={item.image3} alt="" id='blogpost-img'/>
                <p>{item.image_Title3}</p>
              </div>
              </div>
        </div>
      ));
    }

    return content;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div><p>{error}</p><Link to="/">Go back to the homepage</Link></div>;

  return (
    <div className='blog-main-container'>
       <p className='Blog-details-p'><strong>{post.date}</strong></p>
        <div className='Blog-details-container'>
        <h3 className='Blog-details-h3'>{post.title}</h3>
        <div className='photoAndtext'>
        <p className='Blog-details-p introduction'>{renderContent(post.introduction)}</p> 
        {post.mainPhoto && <img src={post.mainPhoto} alt={post.title} className='main-photo' />} 
        </div>     
      <div className='Blog-details-p'>
        {renderContent(post.content)} 
      </div>
      
      {post.mainEarringPhoto && (
        <div className='earring-photo'>
          <img src={post.mainEarringPhoto} alt="Earring" />
        </div>
      )}
    </div>
    </div>
  );
};

export default BlogPost;

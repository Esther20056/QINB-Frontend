import React, { useEffect, useState } from 'react';
import Post from './BlogArray';
import { Link } from 'react-router-dom';
import './Blog.css'

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setBlogPosts(Post);
    } catch (err) {
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-container">
          <h2>Recent Posts</h2>
        <div className="blog">
      {blogPosts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        blogPosts.map((post) => (
          <div key={post.id} className="blog-post">
            <img src={post.mainPhoto} alt={post.title} className='blog-img'/>
            <h3 className='blog-h3'>{post.title}</h3>
            <Link to={`/blog/${post.id}`} className="read-more-link">Read More</Link>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default Blog;

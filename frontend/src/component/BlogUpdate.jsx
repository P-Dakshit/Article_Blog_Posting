import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Blog.css';

const BlogUpdate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // If you add a get-by-id endpoint later, replace this
        const { data } = await axios.get('http://localhost:8000/api/blog/blog_id', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const blog = data.find(b => b.id === parseInt(id));
        if (blog) {
          setTitle(blog.title);
          setContent(blog.content);
        }
      } catch (err) {
        toast.error("Failed to load blog for editing!");
        console.error('Fetch error:', err.response?.data || err.message);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:8000/api/blog/up_blog_id/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success("Blog updated successfully!");
      navigate('/blogs');
    } catch (err) {
      toast.error("Failed to update blog!");
      console.error('Update error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="blog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <label>Content</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          rows="6"
          required 
        />
        <label>Image</label>
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default BlogUpdate;

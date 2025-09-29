import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const BlogCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:8000/api/blog/c_blog', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success("Blog created successfully!");
      navigate('/blogs');
    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
        toast.error(`Failed to create blog: ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        console.error("No response from server:", err.request);
        toast.error("No response from server");
      } else {
        console.error("Error setting up request:", err.message);
        toast.error("Frontend setup error");
      }
    }

  };

  return (
    <div className="blog-container">
      <h2>Create Blog</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogCreate;

import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Pencil, CircleX, ChevronsRight } from 'lucide-react';
import './Blog.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // {id, role}
  const navigate = useNavigate();

  const trimContent = (text, wordLimit = 30) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const url = user.role === 'admin'
          ? 'http://localhost:8000/api/blog/all_blogs'
          : 'http://localhost:8000/api/blog/blog_id';
        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        console.log("Fetched blogs:", data);

        setBlogs(data);
      } catch (err) {
        toast.error("Failed to fetch blogs!");
        console.error('Fetch error:', err.response?.data || err.message);
      }
    };

    fetchBlogs();
  }, [user.role]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this blog?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/blog/d_blog_id/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBlogs(blogs.filter(blog => blog.id !== id));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete blog!");
      console.error('Delete error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="blog-container">
      <div
      style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "13px"
          }}
      >
        <h2>Blogs</h2>
        {/* Add new blog card */}
        <div
          className="add-card"
          onClick={() => navigate("/blogs/create")}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <PlusCircle size={40} color="#124170" />
        </div>
      </div>
      <div className="blog-list">
        {blogs.map(blog => (
          <div className="blog-card" key={blog.id}>
            {blog.image_url && (
              <img
                src={`http://localhost:8000/uploads/${blog.image_url}`}
                alt={blog.title}
              />
            )}
            <h3>{blog.title}</h3>
            <p>{trimContent(blog.content, 30)}</p>

            {/* Show author only for admin */}
            {user.role === "admin" && <p>Author: {blog.author}</p>}

            <div className="blog-actions">
              <button
                className="read-more-btn"
                onClick={() => navigate(`/blogs/${blog.id}`)}
              ><span style={{ marginLeft: "6px" }}>Read More </span><ChevronsRight />
              </button>

              {/* Show edit/delete only for the blog owner */}
              {user.id === blog.author_id && (
                <>
                  <button onClick={() => navigate(`/blogs/${blog.id}/edit`)}>
                    <Pencil />
                  </button>
                  <button onClick={() => handleDelete(blog.id)}>
                    <CircleX />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default BlogList;

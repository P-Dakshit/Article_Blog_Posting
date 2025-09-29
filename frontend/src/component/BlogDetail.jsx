import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Blog.css";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/blog/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setBlog(data);
            } catch (err) {
                toast.error("Failed to fetch blog details!");
                console.error("Error fetching blog:", err.response?.data || err.message);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="blog-container">
            <h2>{blog.title}</h2>
            {blog.image_url && (
                <img
                    src={`http://localhost:8000/uploads/${blog.image_url}`}
                    alt={blog.title}
                    style={{ maxWidth: "100%", borderRadius: "8px", margin: "1rem 0" }}
                />
            )}
            <p>{blog.content}</p>
            <button className="read-more-btn" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default BlogDetail;

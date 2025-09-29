import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users/login', formData);

            // Save token and user info
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            const user = response.data.user;
            console.log("User from localStorage:", user);
            console.log("Is admin?", user?.role === 'admin');

            toast.success("Login successful!");
            // Redirect to BlogList after login
            navigate('/blogs');
        } catch (err) {
            toast.error(err.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className='blog-upper-container'>
            <div className="signup-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

                {/* Forgot Password Link */}
                <p style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <Link
                        to="/api/users/forgotPassword"
                        style={{ textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        Forgot Password?
                    </Link>
                </p>
            </div></div>
    );
};

export default Login;

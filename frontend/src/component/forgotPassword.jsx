import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users/forgotPassword', { email });
            // If OTP sent successfully, redirect to reset password page
            navigate('/api/users/resetPassword', { state: { email } });
            toast.success("OTP sent to your email!");
        } catch (err) {
            toast.error(err.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className='blog-upper-container'>
            <div className="signup-container">
                <h2>Forgot Password</h2>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit">Send OTP</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
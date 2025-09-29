import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users/signup', formData);
            toast.success(response.data.message);
            setFormData({ username: '', email: '', password: '', role: 'user' });
        } catch (err) {
            toast.error(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className='blog-upper-container'>
            <div className="signup-container">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />

                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                    <label>Role</label>
                    <div className="role-options">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={handleChange}
                            />
                            User
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={formData.role === 'admin'}
                                onChange={handleChange}
                            />
                            Admin
                        </label>
                    </div>

                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
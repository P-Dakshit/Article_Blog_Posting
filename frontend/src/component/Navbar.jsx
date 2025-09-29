import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import "./Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false); // close menu on logout
    toast.info("Logged out successfully!");
    navigate("/api/user/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        MyBlog
      </div>

      {/* Links */}
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link>
        {user && user.role === 'admin' && (
          <Link to="/admin" onClick={() => setIsOpen(false)}>Manage Users</Link>
        )}

        {/* Mobile Auth Buttons */}
        {isOpen && (
          <div className="mobile-auth-buttons">
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/api/users/login" onClick={() => setIsOpen(false)}><button>Login</button></Link>
                <Link to="/api/users/signup" onClick={() => setIsOpen(false)}><button>Sign Up</button></Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Hamburger */}
      <div className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Desktop Auth Buttons */}
      {!isOpen && (
        <div className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-user">{user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/api/users/login"><button>Login</button></Link>
              <Link to="/api/users/signup"><button>Sign Up</button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
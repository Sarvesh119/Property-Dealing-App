import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">🏠 PropertyRental</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/listings">Listings</Link>
        {user && <Link to="/add-property">Add Property</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

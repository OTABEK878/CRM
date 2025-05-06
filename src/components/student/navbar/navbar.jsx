import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiLogOut, FiSearch, FiShoppingCart } from 'react-icons/fi';
import './navbar.css';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => window.removeEventListener('storage', updateCartCount);
  }, [location]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/">Otabek's Shop</Link>
        </div>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Mahsulotlarni izlash" className="search-input" />
        <button className="search-button"><FiSearch /></button>
      </div>

      <div className="navbar-right">
        <button className="cart-btn" onClick={() => navigate('/cart')}>
          <FiShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Home from '../home/home';
import Products from '../products/products';
import MyProfile from '../myprofile/myprofile';
import './Admin.css';

const Admin = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const defaultProducts = [
    { id: 1, name: 'Telefon', price: 1200000, quantity: 10 },
    { id: 2, name: 'Noutbuk', price: 5000000, quantity: 5 },
    { id: 3, name: 'Planshet', price: 2500000, quantity: 15 },
  ];

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const sortProducts = (key, direction) => {
    const sorted = [...products].sort((a, b) =>
      direction === 'asc' ? a[key] - b[key] : b[key] - a[key]
    );
    setProducts(sorted);
    setSortConfig({ key, direction });
  };

  const deleteProduct = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
  };

  return (
    <div className="admin-panel">
      <header className="header">
        <h1>CRM</h1>
        <div className="user-section">
          <FaUserCircle size={30} />
          <button onClick={handleLogout}>LogOut</button>
        </div>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <button onClick={() => setActiveTab('Home')}>Home</button>
          <button onClick={() => setActiveTab('Products')}>Products</button>
          <div style={{ flexGrow: 1 }}></div>
          <button onClick={() => setActiveTab('MyProfile')}>My Profile</button>
        </aside>
        <section className="content-area">
          {activeTab === 'Home' && <Home />}
          {activeTab === 'Products' && (
            <Products
              products={products}
              setProducts={setProducts}
              sortProducts={sortProducts}
              deleteProduct={deleteProduct}
            />
          )}
          {activeTab === 'MyProfile' && <MyProfile />}
        </section>
      </div>
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Home from '../home/home';
import Products from '../products/products';
import MyProfile from '../myprofile/myprofile';
import Zakazlar from '../zakazlar/zakazlar';
import './Admin.css';

const Admin = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    setProducts(savedProducts ? JSON.parse(savedProducts) : []);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const sortProducts = (key, direction) => {
    const sorted = [...products].sort((a, b) =>
      direction === 'asc' ? a[key] - b[key] : b[key] - a[key]
    );
    setProducts(sorted);
  };

  const deleteProduct = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
    localStorage.setItem('products', JSON.stringify(filtered));
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
          <button onClick={() => setActiveTab('Zakazlar')}>Zakazlar</button>
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
          {activeTab === 'Zakazlar' && <Zakazlar />}
          {activeTab === 'MyProfile' && <MyProfile />}
        </section>
      </div>
    </div>
  );
};

export default Admin;

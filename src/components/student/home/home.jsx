import React, { useEffect, useState } from 'react';
import './home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);

    const initialQuantities = {};
    storedProducts.forEach(p => initialQuantities[p.id] = 1);
    setQuantities(initialQuantities);
  }, []);

  const handleDecrease = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  const handleIncrease = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = quantities[product.id];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage")); // triggers navbar update
    alert(`${product.name} savatchaga qo'shildi`);
  };

  return (
    <div className="student-home">
      <h2 style={{ textAlign: 'center' }}>Tovarlar</h2>
      <div className="product-cards">
        {products.length > 0 ? products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Narxi: {product.price.toLocaleString()} so'm</p>
            <p>Mavjud soni: {product.quantity}</p>
            <p>Jami: {(product.price * quantities[product.id]).toLocaleString()} so'm</p>

            <div className="quantity-selector">
              <button onClick={() => handleDecrease(product.id)}>-</button>
              <span>{quantities[product.id]}</span>
              <button onClick={() => handleIncrease(product.id)}>+</button>
            </div>

            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        )) : <p>Hozircha tovarlar mavjud emas.</p>}
      </div>
    </div>
  );
};

export default Home;

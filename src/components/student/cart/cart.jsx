import React, { useEffect, useState } from 'react';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDelete = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCart(updated);
  };

  const handleDecrease = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    updateCart(updated);
  };

  const handleIncrease = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    updateCart(updated);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Tovar</th>
            <th>Narxi</th>
            <th>Soni</th>
            <th>Jami</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString()} so'm</td>
              <td>
                <div className="quantity-control">
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
              </td>
              <td>{(item.price * item.quantity).toLocaleString()} so'm</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div className="summary-left">
          <p><b>Tovarlar:</b> {totalCount} ta</p>
          <p><b>Umumiy:</b> {totalPrice.toLocaleString()} so'm</p>
        </div>
        <button className="zakaz-btn">Zakaz</button>
      </div>
    </div>
  );
};

export default Cart;

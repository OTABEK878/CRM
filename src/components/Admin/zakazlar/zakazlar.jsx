import React, { useEffect, useState } from 'react';
import './zakazlar.css';

const Zakazlar = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(data);
  }, []);

  return (
    <div className="zakazlar-container">
      <h2>Zakazlar Ro‘yxati</h2>
      {orders.length === 0 ? (
        <p>Hozircha zakazlar yo‘q.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="zakaz-card">
            <h3>Zakaz ID: {order.id}</h3>
            <p><b>Sana:</b> {order.createdAt}</p>
            <table>
              <thead>
                <tr>
                  <th>Tovar</th>
                  <th>Soni</th>
                  <th>Jami</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.quantity * item.price).toLocaleString()} so'm</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><b>Umumiy summa:</b> {order.totalPrice.toLocaleString()} so'm</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Zakazlar;

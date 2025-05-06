import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './components/login/LogIn';
import Admin from './components/Admin/admin/Admin';
import StudentNavbar from './components/student/navbar/navbar';
import StudentHome from './components/student/home/home';
import Cart from './components/student/cart/cart';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  return (
    <BrowserRouter>
      <div className="app-container">
        {!isAuthenticated ? (
          <LogIn setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
        ) : userRole === 'admin' ? (
          <Admin setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <>
            <StudentNavbar setIsAuthenticated={setIsAuthenticated} />
            <Routes>
              <Route path="/" element={<StudentHome />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

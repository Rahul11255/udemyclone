import React from 'react';
import './App.css';
import GotoTop from './Components/home/GotoTop';
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from './Components/home/landing/Landing';
import Navbar from './Components/navbar/Navbar';
import Offer from './Components/offers/Offer';
import Cart from './Pages/Cart';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Admin from './Pages/Admin';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  console.log("app.jsx");
  return (
    <>
      {!isAdminRoute && <Offer/>}
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user-cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <GotoTop/>
    </>
  );
}

export default App;

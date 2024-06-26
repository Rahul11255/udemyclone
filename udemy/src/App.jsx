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
import SingleProduct from './Pages/SingleProduct';
import Products from './Pages/Products';
import Footer from './Components/footer/Footer';
import Account from './Pages/Account';
import MyOrder from './Pages/MyOrder';
import Contact from './Pages/Contact';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  console.log("app.jsx");
  return (
    <>
      {!isAdminRoute && <Offer/>}
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path="/" element={<Landing />}  />
        <Route path="/user-cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/order" element={<MyOrder />} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      {!isAdminRoute &&   <hr />}
      {!isAdminRoute && <Footer/>}
      <GotoTop/>
    </>
  );
}

export default App;

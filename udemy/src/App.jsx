import './App.css'
import GotoTop from './Components/home/GotoTop';
import { Routes, Route } from "react-router-dom";
import Landing from './Components/home/landing/Landing';
import Navbar from './Components/navbar/Navbar';
import Offer from './Components/offers/Offer'
import Cart from './Pages/Cart';
import Register from './Pages/Register';

function App() {

  console.log("app.jsx");
  return (
    <>
       <Offer/>
       <Navbar/>
       <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user-cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
       </Routes>
       <GotoTop/>
      
    </>
  )
}

export default App

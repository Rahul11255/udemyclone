import './App.css'
import GotoTop from './Components/home/GotoTop';
import { Routes, Route } from "react-router-dom";
import Landing from './Components/home/landing/Landing';
import Navbar from './Components/navbar/Navbar';
import Offer from './Components/offers/Offer'
import Cart from './Pages/Cart';

function App() {

  console.log("app.jsx");
  return (
    <>
       <Offer/>
       <Navbar/>
       <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user-cart" element={<Cart />} />
       </Routes>
       <GotoTop/>
      
    </>
  )
}

export default App

import './App.css'
import Landing from './Components/home/landing/Landing';
import Navbar from './Components/navbar/Navbar';
import Offer from './Components/offers/Offer'

function App() {

  console.log("app.jsx");
  return (
    <>
       <Offer/>
       <Navbar/>
       <Landing/>
      
    </>
  )
}

export default App

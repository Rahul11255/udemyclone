import './App.css'
import Navbar from './Components/navbar/Navbar';
import Offer from './Components/offers/Offer'

function App() {

  console.log("app.jsx");
  return (
    <>
      <div>
       <Offer/>
       <Navbar/>
       <h1>hello</h1>
      </div>
    </>
  )
}

export default App

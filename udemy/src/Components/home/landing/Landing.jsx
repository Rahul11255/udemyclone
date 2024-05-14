import Footer from "../../footer/Footer"
import Feature from "./Feature"
import HeroSlider from "./HeroSlider"
import Heroimg from "./Heroimg"
import Herotext from "./Herotext"
import Services from "./Services"
import Topproducts from "./Topproducts"

const Landing = () => {
  return (
    <>
    <HeroSlider/>
    <Herotext/>
    <Feature/>
    <Topproducts/>
    <Heroimg/>
    <Services/>
    <hr />
    <Footer/>
    </>
  )
}

export default Landing
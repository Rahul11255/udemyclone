import { useEffect } from "react"
import Feature from "./Feature"
import HeroSlider from "./HeroSlider"
import Heroimg from "./Heroimg"
import Herotext from "./Herotext"
import Services from "./Services"
import Topproducts from "./Topproducts"

const Landing = () => {
  
  useEffect(()=>{
     document.title = "Aapka khud ka Bazar"
  })

  return (
    <>
    <HeroSlider/>
    <Herotext/>
    <Feature/>
    <Topproducts/>
    <Heroimg/>
    <Services/>
    </>
  )
}

export default Landing
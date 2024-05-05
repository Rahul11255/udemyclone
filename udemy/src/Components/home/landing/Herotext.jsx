// import heroimg from "../../../assets/hero-img.png"
import Button from '@mui/material/Button';


const Herotext = () => {
  return (
    <div className="hero_text_container">
        <div>
        <p>Here to make  heads turn</p>
        <h1>You can pair <br/> with Products</h1>
        <Button className='shop_btn' variant="contained" sx={{backgroundColor:"#5567EE"}} size='large'>Shop Now</Button>
        </div>
    </div>
  )
}

export default Herotext
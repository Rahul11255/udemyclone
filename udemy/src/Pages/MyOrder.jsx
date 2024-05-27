import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyOrdeComp from '../Components/myOrder/MyOrdeComp';


const MyOrder = () => {
  return (
    <>
      <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon />  <Link className='link' to={'/account'}> Account</Link> <KeyboardArrowRightIcon /> <span>My Order</span>
        </p>
      </section>
      <MyOrdeComp/>
      
    </>
  )
}

export default MyOrder
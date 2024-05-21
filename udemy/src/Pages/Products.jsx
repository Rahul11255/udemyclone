import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


const Products = () => {
  return (
    <>

<section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon  /> <span>Products</span>
          
        </p>
      </section>

    </>
  )
}

export default Products
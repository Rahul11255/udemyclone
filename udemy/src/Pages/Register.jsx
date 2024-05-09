import React from 'react'
import Registercomp from '../Components/auth/Registercomp'
import "../Components/auth/register.css"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from 'react-router-dom';


const Register = () => {
  return (
    <>
      <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon /> ACCOUNT
        </p>
      </section>
        <Registercomp/>
    </>
  )
}

export default Register
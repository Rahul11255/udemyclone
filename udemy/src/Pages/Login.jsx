import React from 'react'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from 'react-router-dom';
import Logincomp from '../Components/auth/Logincomp';


const Login = () => {
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
      <Logincomp/>

    </>
  )
}

export default Login
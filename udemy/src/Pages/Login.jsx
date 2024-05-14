import React, { useEffect } from 'react'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useNavigate } from 'react-router-dom';
import Logincomp from '../Components/auth/Logincomp';


const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        navigate("/")
    }
  }, [navigate]);
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
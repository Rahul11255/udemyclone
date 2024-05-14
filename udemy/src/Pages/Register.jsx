import React, { useEffect } from 'react'
import Registercomp from '../Components/auth/Registercomp'
import "../Components/auth/register.css"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

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
        <Registercomp/>
    </>
  )
}

export default Register
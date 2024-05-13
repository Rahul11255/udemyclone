import React from 'react'
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import loginimg from "../../assets/login_bg.jpg"

const Logincomp = () => {
  return (
    <div className='register_contaainer'>
    <div className='register_img'>
      <img src={loginimg} alt="login-imgage" />
    </div>
    <div className='register_form_container'>
      <div>
        <div className='register_form_text'>
          <h1>Login</h1>
          <p>Please login below account detail</p>
        </div>
        <div className='register_form'>
         <form>
            <p>Email</p>
            <input type="email" placeholder='Email' />
            <p>Password</p>
          <input type="password" placeholder='Password'/>
            <div className='register_btn'> <Button>CREATE</Button> 
            </div>
            <h4>Don't have an account?</h4>
            <Link to={'/register'} className='login_link'>Create account</Link>
         </form>
      </div>
      </div>
    </div>
</div>
  )
}

export default Logincomp
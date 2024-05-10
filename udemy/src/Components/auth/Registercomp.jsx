import React from 'react'
// import registerimg from "../../assets/register.jpeg"
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

const Registercomp = () => {
  return (
    <div className='register_contaainer'>
        <div className='register_img'>
          <img src="https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className='register_form_container'>
          <div>
            <div className='register_form_text'>
              <h1>Create Account</h1>
              <p>Please register below account detail</p>
            </div>
            <div className='register_form'>
             <form>
              <p>First Name</p>
              <input type="text" placeholder='First Name' />
              <p>Last Name</p>
              <input type="text" placeholder='Last Name'/>
              <p>Email</p>
              <input type="email" placeholder='Email' />
              <p>Password</p>
              <input type="password" placeholder='Password'/>
                <div className='register_btn'> <Button>CREATE</Button> 
                </div>
                <h4>Already an account holder?</h4>
                <Link to={'/login'} className='login_link'>Login</Link>
             </form>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Registercomp
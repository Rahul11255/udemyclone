import React from 'react'
import "./contact.css"
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Button } from '@mui/material';

const ContactComp = () => {
  return (
    <div className='contact_container'>
      <div className='contact_hero_text'>
           <h1>
              How We Can Help You?
           </h1>
           <p>
           Got a question? We had love to hear from you. Send us a message and we will respond as soon as possible.
           </p>
      </div>
        <div className='getinto_touch_container'>
        <div className='touch_text'>   <h2>Get In Touch</h2></div>
        <div className='contact_cards'>
          <div>
            <FmdGoodOutlinedIcon sx={{color:"#5567EE",fontSize:40}}/>
            <p style={{marginTop:"12px"}} >Noth-West New Delhi</p>
            <p>Rohni Sec-31 Prahladpur Banger </p>
          </div>
          <div>
            <PhoneAndroidOutlinedIcon sx={{color:"#5567EE",fontSize:40}}/>
            <p  style={{marginTop:"12px"}} >Phone: +91 9354-081-946</p>
            <p>Fax: +14 1800-000-000</p>
          </div>
          <div>
            <EmailOutlinedIcon sx={{color:"#5567EE",fontSize:40}}/>
            <p  style={{marginTop:"12px"}} >rr710505@gmail.com</p>
            <p>rahul@arramton.com</p>
          </div>
        </div>
        <div className='touch_text' style={{marginTop:"30px"}}>
          <h2>Drop Us Message</h2>
        </div>
        <div className='contact_grid'>
          <div>
           <input type="text" placeholder='Your Name' />
           <input type="text" placeholder='Your Email Address' />
           <input type="text" placeholder='Your Mobile' />
          </div>
          <div>
            <textarea name="" rows={4} id=""></textarea>
          </div>
          <div>
          <Button className='contact_btn'>Submit</Button>

          </div>
        </div>
        <div>
        
        </div>
        </div>
    </div>
  )
}

export default ContactComp
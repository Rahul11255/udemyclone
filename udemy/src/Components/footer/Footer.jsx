import React from 'react';
import "./footer.css";
import { Button, Grid, } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
 import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
 import TwitterIcon from '@mui/icons-material/Twitter';
 import LinkedInIcon from '@mui/icons-material/LinkedIn';
 import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (

    <div className="footer">
      <Grid container spacing={2}>
        {/* First Grid */}
        <Grid item xs={12} sm={4}>
          <div className='footer_left'>
              <div className='footer_img'> <img src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg" alt="logo" /> </div>
                <p>Lopsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text</p>
                <div className='footer_icon'>
                <div> <FacebookOutlinedIcon sx={{color:"#3B8BF4",fontSize:45}}/> </div>
                <div> <TwitterIcon sx={{color:"white",fontSize:25}}/> </div>
                <div> <LinkedInIcon sx={{color:"white",fontSize:25}}/> </div>
                <div> <InstagramIcon sx={{color:"white",fontSize:25}}/> </div>
             
                </div>
          </div>
        </Grid>
        {/* Second Grid */}
        <Grid item xs={12} sm={4}>
            <ul  className='footer_links' >
              <li> <LinkIcon/> About Us</li>
              <li> <LinkIcon/> Contact</li>
              <li> <LinkIcon/> Faq</li>
              <li> <LinkIcon/> Search</li>
              <li> <LinkIcon/> Terms Conditions</li>
            </ul>
        </Grid>
        {/* Third Grid */}
        <Grid item xs={12} sm={4}>
          <div className='footer_right'>
              <h3>Newsletter</h3>
              <div className='inputbtn'> <input type="text" placeholder='Enter your email..' /> <Button>SUBSCRIBE</Button> </div>
              <div>Div 3</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;

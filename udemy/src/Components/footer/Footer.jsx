import React from 'react';
import "./footer.css";
import { Button, Grid, } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
 import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
 import TwitterIcon from '@mui/icons-material/Twitter';
 import LinkedInIcon from '@mui/icons-material/LinkedIn';
 import InstagramIcon from '@mui/icons-material/Instagram';
 import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
<>
    <div className="footer">
      <Grid container spacing={2}>
        {/* First Grid */}
        <Grid item xs={12} sm={4}>
          <div className='footer_left'>
              <div className='footer_img'> <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="logo" /> </div>
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
              <div className='inputbtn'> <input type="text" placeholder='Enter your email..' /> <Button style={{width:"120px"}}>SUBSCRIBE</Button> </div>
              <div style={{marginTop:"12px",display:"flex",gap:"5px"}}>
                <img src="https://hublet-store.myshopify.com/cdn/shop/files/p1.png?v=1626316013" alt=""  />
                <img src="https://hublet-store.myshopify.com/cdn/shop/files/p4.png?v=1626316013" alt=""  />
                <img src="https://hublet-store.myshopify.com/cdn/shop/files/p5.png?v=1626316013" alt=""  />
                <img src="https://hublet-store.myshopify.com/cdn/shop/files/p2.png?v=1626316013" alt=""  />
                <img src="https://hublet-store.myshopify.com/cdn/shop/files/p3.png?v=1626316013" alt=""  />
              </div>
          </div>
        </Grid>
      </Grid>
      
    </div>
    <div className='footer_bottom'>
      <p> Copyright   <CopyrightIcon sx={{fontSize:16,marginLeft:"5px"}}/>2021 Hublet By Qodex </p>
    </div>

    </>
  );
}

export default Footer;

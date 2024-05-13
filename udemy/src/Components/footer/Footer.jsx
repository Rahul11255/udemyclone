import React from 'react';
import "./footer.css";
import { Button, Grid, } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const Footer = () => {
  return (
    <div className="footer">
      <Grid container spacing={2}>
        {/* First Grid */}
        <Grid item xs={12} sm={4}>
          <div>
              <div>Div 1</div>
              <div>Div 2</div>
              <div>Div 3</div>
          </div>
        </Grid>
        {/* Second Grid */}
        <Grid item xs={12} sm={4}>
          <div className='footer_links' >
            <ul>
              <li> <LinkIcon/> About Us</li>
              <li> <LinkIcon/> Contact</li>
              <li> <LinkIcon/> Faq</li>
              <li> <LinkIcon/> Search</li>
              <li> <LinkIcon/> Terms Conditions</li>
            </ul>
          </div>
        </Grid>
        {/* Third Grid */}
        <Grid item xs={12} sm={4}>
          <div>
              <h3>Newsletter</h3>
              <div> <input type="text" /> <Button>SUBSCRIBE</Button> </div>
              <div>Div 3</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;

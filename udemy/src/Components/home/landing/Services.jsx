import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import "./services.css"
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import Aos from 'aos'
import 'aos/dist/aos.css'

const Services = () => {

  
  useEffect(() => {
    Aos.init(({duration:1000}))
  }, []); 

  return (
    <Grid container spacing={2} className='services_container'>
     {/* <Grid container className='services'> */}
      <Grid item xs={12} sm={6} md={4} data-aos="zoom-in-up" >
        <div className="service-item">
          <div><AssignmentReturnIcon sx={{ fontSize: 40 }} className='animated-icon'/></div>
          <h3>7 Days Return</h3>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} data-aos="zoom-in-up" >
        <div className="service-item">
        <div><LockIcon sx={{ fontSize: 40 }} className='animated-icon'/></div>
          <h3 >100% Payment Secure</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} data-aos="zoom-in-up" >
        <div className="service-item">
        <div><SettingsIcon sx={{ fontSize: 40 }} className='animated-icon'/></div>

          <h3>Support 24/7</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Grid>
      {/* </Grid> */}
    </Grid>
  );
}

export default Services;

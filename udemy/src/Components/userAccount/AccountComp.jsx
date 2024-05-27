import React from 'react'
import "./account.css"
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';

const AccountComp = ({data}) => {
  return (
    <div className='account_body'>
       <div className='account_container'>
        <div className='account_left' >
            <div className='left_account'>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="profile_img" loading="lazy" />
              <div>
                 <p>Hello,</p>
                 <h4>{data.fname} {data.lname}</h4>
              </div>
            </div>
            <div className='left_order'>
            <InventoryIcon sx={{color:"#5567EE",fontSize:32}}/>
                <Link to={'/account/order'} style={{textDecoration:"none",color:"black"}}>
                 <h4>My Order</h4>
                 </Link>
            </div>
        </div>
        <div className='right_account' >
          
        </div>
       </div>
    </div>
  )
}

export default AccountComp
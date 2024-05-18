import React, { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import "./single.css";
import Imgsection from "./Imgsection"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import { useCart } from "react-use-cart";
import { Alert, Snackbar } from "@mui/material";

const SingleProComp = ({ data }) => {
  const { addItem } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [addedProductTitle, setAddedProductTitle] = useState('');

  const addtoCart = (product) => {
    addItem(product);
    setAddedProductTitle(product.title);
    setOpenSnackbar(true);
  };


  const discountPrice = (price, discount) => {
    const discountPrice = price * (discount / 100);
    const actualPrice = price - discountPrice;
    return actualPrice.toFixed(0);
  };

  return (
    <div className="single_container">
      <div className="single_grid">
        <div className="single_left">
          <Imgsection userdata={data} />
        </div>
        <div className="single_right">
          <h2>{data.title}</h2>
           <h1 className="rating">{data.rating} <StarIcon sx={{fontSize:12}}/></h1>
          <p>
          ₹{discountPrice(data.price, data.discountPercentage)}
            <del style={{ color: "grey",fontWeight:400 }}> ₹{data.price}</del> <span style={{color:"#32CD32",fontWeight:400 ,  fontSize:"15px",marginLeft:"2px"}}>{data.discountPercentage} off%</span> 
          </p>
          <h4>
            Availability : {data.stock > 0 ? <> <span><CheckCircleOutlineIcon sx={{fontSize:20}}/>In Stock</span></> :  <span style={{color:"red"}}><CancelIcon/>Out of Stock</span> }
          </h4>
          <h5>
            {data.description}
          </h5>
          <hr className="line" />
         <div className="single_comp_btn">
              <Button sx={{backgroundColor:"#FF9F00"}} onClick={()=>addtoCart(data)} >Add To Cart</Button>
              <Button sx={{backgroundColor:"#FB641B"}}>buy now</Button>
         </div>
         <hr className="line" />
          <p className="brand"> Category : <span >{data.category}</span></p>
          <p className="brand"> Brand : <span >{data.brand}</span></p>

        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenSnackbar(false)}>
          "{addedProductTitle}" added to cart
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SingleProComp;

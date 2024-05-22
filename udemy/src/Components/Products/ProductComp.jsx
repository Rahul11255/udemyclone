import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Tooltip } from "@mui/material";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";

const ProductComp = ({selectedCategory ,data ,clearCat , handleCategoryChange }) => {

  const discountPrice = (price, dis) => {
    const discountPrice = price * (dis / 100);
    const actualPrice = price - discountPrice;
    const roundedPrice = actualPrice.toFixed(0); // Rounds to the nearest whole number
    return <span style={{ marginRight: "5px" }}>₹{roundedPrice}</span>;
  };

  return (
    <div className="products_container">
      <div className="product_grid">
        <div className="product_filter">
          <div className="filter_text"> Filter ({data.length}) </div>
          <div
            className=" clear_filter"
            onClick={clearCat}
         
          >
          <p> {selectedCategory && ("Clear filter")}  </p>
          </div>
          <div className="filter_cat">
            <p>Categories</p>
            <div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedCategory}
                name="radio-buttons-group"
                onChange={handleCategoryChange}
              >
                <FormControlLabel
                  value="Decor lighting Accessories"
                  control={<Radio />}
                  label={
                    <Typography sx={{ fontSize: "14px" }}>
                      Decor lighting Accessories
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Smart Watch"
                  control={<Radio />}
                  label={
                    <Typography sx={{ fontSize: "14px" }}>
                      Smart Watch
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Neon Light"
                  control={<Radio />}
                  label={
                    <Typography sx={{ fontSize: "14px" }}>
                      Neon Light
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Ear Buds"
                  control={<Radio />}
                  label={
                    <Typography sx={{ fontSize: "14px" }}>Ear Buds</Typography>
                  }
                />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="product_card">
          {data.map((product, index) => {
            return (
              <div className="p_card" key={index}>
                <div className="p_img">
                  <Link to={`/product/` + product.slug}>
                    <img src={product.thumbnail} alt="" />
                  </Link>
                  <div className="p_cart_btn">
                      
                    <Tooltip title="add to cart">
                      <ShoppingCartOutlinedIcon/>
                    </Tooltip>
                     
                  </div>
                </div>
                <h3>{product.title}</h3>
                <p>
                  {discountPrice(product.price, product.discountPercentage)}
                  <del> ₹{product.price}</del>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductComp;

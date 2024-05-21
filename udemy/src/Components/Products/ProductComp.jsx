import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import axios from "axios"
import "./product.css";
import { useNavigate } from "react-router-dom";

const ProductComp = () => {
   const naviagte = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('');
  const  [data,setData] = useState([])


  const fetchData= async()=>{
    try {
      const res = await axios.get(`http://localhost:3000/products/${selectedCategory}`) 
      console.log(selectedCategory)
      console.log(res.data)
      setData(res.data.product)

    } catch (error) {
      console.error(error)
    }
  }
 
  useEffect(()=>{
   fetchData()
  },[selectedCategory])

  const clearCat=()=>{
    setSelectedCategory("")
  }


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="products_container">
      <div className="product_grid">
        <div className="product_filter">
          <div className="filter_text"> Filter ({ data.length}) </div>
          <div className="filter_text" onClick={clearCat} style={{cursor:"pointer"}}> Clear filter </div>
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
        { data.map((product,index)=>{
          return (
            <div className="p_card" key={index}>
                <div className="p_img">
                  <img src="" alt="" />
                  <div className="">33%</div>
                  <div className="cart_btn">hy</div>
                </div>
            <h3>{product.title}</h3>
            <p>price </p>
           </div>

          )
        })}
           
        </div>
      </div>
    </div>
  );
};

export default ProductComp;

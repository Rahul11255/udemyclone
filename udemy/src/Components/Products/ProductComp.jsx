import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import "./product.css";

const ProductComp = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "Decor lighting Accessories"
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="products_container">
      <div className="product_grid">
        <div className="product_filter">
          <div className="filter_text"> Filter </div>
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
        <div className="product_card">products</div>
      </div>
    </div>
  );
};

export default ProductComp;

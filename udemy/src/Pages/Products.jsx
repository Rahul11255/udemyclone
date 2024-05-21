import React from "react";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ProductComp from "../Components/Products/ProductComp";

const Products = () => {
  return (
    <>
    <div><input autoFocus type="search" placeholder="search your choice" style={{marginLeft:"400px",padding:"10px 15px"}}/></div>
      <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon /> <span>Products</span>   
        </p>
      </section>
      <ProductComp/>
    </>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ProductComp from "../Components/Products/ProductComp";
import "../Components/Products/product.css"
import axios from "axios";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search,setSearch] = useState("")
  
  console.log(search)
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/products/${selectedCategory}${search}`
      );
      console.log(selectedCategory);
      console.log(res.data);
      setData(res.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      if (search !== "") {
        fetchData();
      }
    }, 500);
    fetchData()
    return ()=> clearTimeout(time)
  }, [selectedCategory,search]);

  const clearCat = () => {
    setSelectedCategory("");
  };

  const handleSearchChange=(event)=>{
    setSearch(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };



  return (
    <>
      <div className="input_container">
        <input
          autoFocus
          type="search"
          placeholder="search your choice"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon  /> <span>Products</span>
        </p>
      </section>
      <ProductComp 

data={data} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} clearCat={clearCat} handleCategoryChange={handleCategoryChange}
      />
    </>
  );
};

export default Products;

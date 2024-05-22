import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ProductComp from "../Components/Products/ProductComp";
import "../Components/Products/product.css";
import axios from "axios";
import Loading from "../Components/Loading";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:3000/products/${selectedCategory}${search}`
      );
      setData(res.data.product);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      if (search !== "") {
        fetchData();
      }
    }, 500);
    fetchData();
    return () => clearTimeout(time);
  }, [selectedCategory, search]);

  const clearCat = () => {
    setSelectedCategory("");
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div className="input_container">
        <input
          autoFocus
          type="search"
          placeholder="Search your choice"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon /> <span>Products</span>
        </p>
      </section>
      {loading ? (
        <> <div className="product_loading">
          <Loading/>
          </div>
        </>
      ) : error ? (
        <p style={{color:"red", fontFamily:"Poppins, sans-serif"}}>{error}</p>
      ) : (
        <ProductComp
          data={data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          clearCat={clearCat}
          handleCategoryChange={handleCategoryChange}
        />
      )}
    </>
  );
};

export default Products;

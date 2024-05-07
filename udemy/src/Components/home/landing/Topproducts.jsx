import { useState, useEffect } from "react";
import axios from "axios";
import "./topproducts.css";
import ProductsCard from "./ProductsCard";

// import watchimg from "../../../assets/product-watch.jpg";

const Topproducts = () => {

  const [data, setData] = useState([]);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const slicedData = response.data.products.slice(0, 10);
      setData(slicedData); // Update state with fetched data
      console.log(response.data.products)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();

  }, []); // Empty dependency array to run only once on mount

  return (
    <section className="topdeals_container">
      <div className="topdeals">
        <div className="topdeals_top">
          <h2>Top Deals on Smart Watch</h2>
          <p>Time stops when Im with you</p>
        </div>
        <div className="topdeals_bottom">
          <ProductsCard data={data}/>
        </div>
      </div>
    </section>
  );
};

export default Topproducts;

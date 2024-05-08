import { useState, useEffect } from "react";
import axios from "axios";
import "./topproducts.css";
import ProductsCard from "./ProductsCard";

const Topproducts = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const slicedData = response.data.products
      setData(slicedData); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

  }, []); 

  return (
    <section className="topdeals_container">
      <div className="topdeals">
        <div className="topdeals_top">
          <h2>Top Deals on Smart Watch</h2>
          <p>Time stops when Im with you</p>
        </div>
        <div className="topdeals_bottom">
          <ProductsCard data={data}  startSlice={0} endSlice={10}/>
        </div>
        <div className="topdeals_bottom">
          <ProductsCard data={data}  startSlice={11} endSlice={20}/>
        </div>
      </div>
    </section>
  );
};

export default Topproducts;

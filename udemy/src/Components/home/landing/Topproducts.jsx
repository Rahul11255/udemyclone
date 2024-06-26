import { useState, useEffect } from "react";
import axios from "axios";
import "./topproducts.css";
import ProductsCard from "./ProductsCard";
import Aos from 'aos'
import 'aos/dist/aos.css'
import Loading from "../../Loading";

const Topproducts = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setError(null)
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:3000/products");
      const slicedData = response.data.product
      setData(slicedData); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
    Aos.init(({duration:2000}))
  }, []); 

  return (
    <section className="topdeals_container">
      <div className="topdeals">
        <div className="topdeals_top" data-aos="fade-up"
     data-aos-duration="3000">
          <h2>Top Deals on Smart Watch</h2>
          <p>Time stops when Im with you</p>
        </div>
        <div className="topdeals_bottom">
        {loading ? (
          <> <Loading/>
         </>
        ):error ? (
          <p style={{color:"red", fontFamily:"Poppins, sans-serif"}}>{error}</p>
        ) : (
          <>
          <ProductsCard data={data}  startSlice={0} endSlice={4}/>
          <ProductsCard data={data}  startSlice={5} endSlice={100}/>
          </>
        )}
        </div>
      </div>
    </section>
  );
};

export default Topproducts;

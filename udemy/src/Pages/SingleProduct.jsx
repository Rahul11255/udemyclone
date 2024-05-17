import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import SingleProComp from "../Components/SingleProduct/SingleProComp";

const SingleProduct = () => {
  const [data, setData] = useState(""); 
  const { slug } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/${slug}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <>
    <section className="track_link">
        <p>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <KeyboardArrowRightIcon /> <span>{data.title}</span>
        </p>
      </section>
     <SingleProComp data={data}/>
    </>
  );
};

export default SingleProduct;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myorder.css";
import axios from "axios";
import {Button} from "@mui/material"

const MyOrdeComp = () => {
  const [order, setOrder] = useState([]);
  const [totalprice,setTotalprice] = useState()

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("myorder", res.data.order);
      setOrder(res.data.order);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const discountPrice = (price, dis) => {
    const discountPrice = price * (dis / 100);
    const actualPrice = price - discountPrice;
    const roundedPrice = actualPrice.toFixed(0); // Rounds to the nearest whole number
    return <span style={{ marginRight: "5px" }}>₹{roundedPrice}</span>;
  };

  return (
    <div className="myorder_container">
      {order.map((data, index) => {
        return (
          <div className="order_card" key={index}>

            {data.items.map((item) => {
              return (
                <>
                  <Link to={`/product/` + item.slug}>
                    <div className="order_img">
                      <img src={item.thumbnail} alt={item.tite} />
                    </div>
                  </Link>
                  <div className="order_details">
                    <p>{item.title}</p>
                  </div>
                  <div className="order_price">
                    <p>{discountPrice(item.price, item.discountPercentage)}</p>
                   <h5> <del> ₹{item.price}</del></h5>
                  </div>
                  <div className="order_quantity">
                      <p>{item.quantity}</p>
                  </div>
                  <div className="order_status">  </div>
                </>
              );
            })}
            <div className="order_total_price">
            <p> <b>Total Price : <span>₹{data.totalAmount}</span></b></p>
            <p> You will save ₹{data.discount} on this order</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrdeComp;

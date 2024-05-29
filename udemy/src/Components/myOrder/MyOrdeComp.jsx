import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myorder.css";
import { Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import axios from "axios";
import shopnow from "../../assets/4611253.jpg";

const MyOrderComp = () => {
  const [order, setOrder] = useState([]);

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
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = `My Order (${order.length})`;
  }, [order.length]);

  const discountPrice = (price, dis) => {
    const discountPrice = price * (dis / 100);
    const actualPrice = price - discountPrice;
    const roundedPrice = actualPrice.toFixed(0); // Rounds to the nearest whole number
    return <span style={{ marginRight: "5px" }}>₹{roundedPrice}</span>;
  };

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Processing':
        return 1;
      case 'Shipped':
        return 2;
      case 'Delivered':
        return 3;
      default:
        return 0;
    }
  };

  const steps = [
    'Order Placed',
    'Order Confirmed',
    'Order Shipped',
    'Order Delivered',
  ];

  return (
    <div className="myorder_container">
      {order.length === 0 ? (
        <div className="no_orders">
          <p>No orders found. Please <Link to="/products">shop now</Link>!</p>
          <Link to="/products"> <img src={shopnow} alt="shop now" /> </Link>
        </div>
      ) : (
        order.map((data, index) => {
          const stepIndex = getStepIndex(data.status);
          console.log("Order status",stepIndex)
          return (
            <div key={index} className="order_card">
              {data.items.map((item) => {
                return (
                  <div key={item.id} className="order_card" style={{border:"none", borderBottom:"1px dashed lightgrey"}}>
                    <Link to={`/product/` + item.slug}>
                      <div className="order_img">
                        <img src={item.thumbnail} alt={item.title} />
                      </div>
                    </Link>
                    <div className="order_details">
                      <p>{item.title}</p>
                    </div>
                    <div className="order_price">
                      <p>{discountPrice(item.price, item.discountPercentage)}</p>
                      <h5><del> ₹{item.price}</del></h5>
                    </div>
                    <div className="order_quantity">
                      <p>{item.quantity}</p>
                    </div>
                  </div>
                );
              })}
              <div className="order_status">
                <Box sx={{ width: '100%' }}>
                  <Stepper activeStep={stepIndex} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step
                        key={index}
                        completed={index < stepIndex}
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: index <= stepIndex ? 'green' : 'lightgray',
                          },
                          '& .MuiStepConnector-line': {
                            borderColor: index <= stepIndex ? 'green' : 'lightgray',
                          },
                        }}
                      >
                        <StepLabel
                          StepIconProps={{
                            sx: {
                              '&.Mui-active': { color: 'green' },
                              '&.Mui-completed': { color: 'green' },
                              '&.Mui-disabled': { color: 'lightgray' },
                            },
                          }}
                        >
                          <Box sx={{ textAlign: 'center' }}>
  <Typography
    variant="p"
    component="span"
    sx={{
      color: index <= stepIndex ? 'green' : 'lightgray',
    }}
  >
    {label}
    {label === 'Order Placed' && (
      <p>
        {`${new Date(data.createdAt).toLocaleString()}`} {/* Display the creation timestamp */}
      </p>
    )}
    {label === 'Order Confirmed' && (
      <p>
        {data.history.find(status => status.status === 'Processing') &&
          `${new Date(data.history.find(status => status.status === 'Processing').timestamp).toLocaleString()}`} {/* Display the processing timestamp if available */}
      </p>
    )}
    {label === 'Order Shipped' && (
      <p>
        {data.history.find(status => status.status === 'Shipped') &&
          `${new Date(data.history.find(status => status.status === 'Shipped').timestamp).toLocaleString()}`} {/* Display the shipped timestamp if available */}
      </p>
    )}
    {label === 'Order Delivered' && (
      <p>
        {data.history.find(status => status.status === 'Delivered') &&
          `${new Date(data.history.find(status => status.status === 'Delivered').timestamp).toLocaleString()}`} {/* Display the delivered timestamp if available */}
      </p>
    )}
    {/* Add similar checks for other status labels as needed */}
  </Typography>
</Box>

                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
              <div className="order_total_price">
                <p><b>Total Price <span>(Include delivery charge+80)</span> : <span>₹{data.totalAmount}</span></b></p>
                <p>You will save ₹{data.discount} on this order</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrderComp;

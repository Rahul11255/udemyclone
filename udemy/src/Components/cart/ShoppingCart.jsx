import React, { useState } from "react";
import { useCart } from "react-use-cart";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import axios from 'axios';
import CartTotal from "./CartTotal";

const ShoppingCart = () => {
  const { totalItems, items, updateItemQuantity, removeItem, emptyCart, isEmpty } = useCart();
  const [message ,setMessage] = useState("")
  const [address, setAddress] = useState({
    name: "",
    landmark: "",
    houseNo: "",
    city: "",
    pincode: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({
    name: false,
    landmark: false,
    houseNo: false,
    city: false,
    pincode: false,
    phoneNumber: false
  });

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" // Check if the value is empty after trimming
    }));
  };
  const handlePlaceOrder = async () => {
    const hasEmptyFields = Object.values(address).some(value => value.trim() === "");
    if (hasEmptyFields) {
      setErrors(prevErrors => ({
        ...prevErrors,
        name: address.name.trim() === "",
        landmark: address.landmark.trim() === "",
        houseNo: address.houseNo.trim() === "",
        city: address.city.trim() === "",
        pincode: address.pincode.trim() === "",
        phoneNumber: address.phoneNumber.trim() === ""
      }));
    } else {
      const orderData = {
        items: items,
        address: address,
        totalAmount: totalAmount,
        discount:discount,
        pricewithoutdiscount:pricewithoutdiscount
      };
      console.log("Order placed:", orderData);
      setAddress({
        name: "",
        landmark: "",
        houseNo: "",
        city: "",
        pincode: "",
        phoneNumber: ""
      });
      setErrors({
        name: false,
        landmark: false,
        houseNo: false,
        city: false,
        pincode: false,
        phoneNumber: false
      });
  
      try {
        const response = await axios.post("http://localhost:3000/order", orderData);
        console.log("Order data sent successfully.", response.data);
        console.log("Order data sent successfully.", response.data.message);
      emptyCart();
        setMessage(response.data.message)
      } catch (error) {
        console.error("Error sending order data:", error);
      }
    }
  };
  


  const discountPrice = (price, discount) => {
    const discountPrice = price * (discount / 100);
    const actualPrice = price - discountPrice;
    return actualPrice.toFixed(0);
  };

  const totalPrice = (price, discount, quantity) => {
    const discountedPrice = discountPrice(price, discount);
    const totalDiscountedPrice = discountedPrice * quantity;
    return totalDiscountedPrice;
  };

  const generateFullAddress = () => {
    return `Name : ${address.name}, House no : ${address.houseNo}, ${address.landmark}, ${address.city} - ${address.pincode}, Phone: ${address.phoneNumber}`;
  };
  const subtotal = items.reduce((acc, item) => acc + totalPrice(item.price, item.discountPercentage, item.quantity), 0);
  const shippingCharges = 80;
  const totalAmount = subtotal + shippingCharges;
  
  const pricewithoutdiscount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = pricewithoutdiscount - subtotal


  if (isEmpty) return <EmptyCart message={message}/>;

  return (
    <section className="cart_container">
      <div className="cart_grid">
        <div className="cart_item">
          <div className="cart_title">
            <h6>My Cart :</h6> <p>{totalItems} Items</p>{" "}
          </div>
          {items.map((item, key) => {
              return (
            <div className="cart_card" key={key}>
              <div className="product_dict">
                <div className="product_img">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="product_description">
                  <p>{item.category}</p>
                  <p>{item.title}</p>
                  <p>
                    <b>Rating</b> {item.rating}
                  </p>
                  <p>
                    {discountPrice(item.price, item.discountPercentage)}{" "}
                    <del style={{color:"grey"}}> ₹{item.price}</del>
                    <span style={{marginLeft:"5px",color:"#32CD32"}}>{item.discountPercentage.toFixed(0)}%</span>
                  </p>
                </div>
              </div>
              <div className="product_quantity">
                <div>
                  <p onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                    <RemoveIcon />
                  </p>
                  <p>{item.quantity}</p>
                  <p onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                    <AddOutlinedIcon />
                  </p>
                </div>
                <p onClick={() => removeItem(item.id)}>
                  <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
                </p>
              </div>
              <div className="product_total_price">
                ₹{totalPrice(item.price, item.discountPercentage, item.quantity)}
              </div>
            </div>
          )})}
          <div className="cart_buttons">
            <Link className="link" to={'/product'}>
              <Button>CONTINUE SHOPPING</Button>
            </Link>
            <Button onClick={emptyCart}>CLEAR CART</Button>
          </div>
        </div>
        <CartTotal
          handleAddressChange={handleAddressChange}
          totalAmount={totalAmount}
          pricewithoutdiscount={pricewithoutdiscount}
          discount={discount}
          shippingCharges={shippingCharges}
          generateFullAddress={generateFullAddress}
          handlePlaceOrder={handlePlaceOrder}
          address={address}
          errors={errors}
            
        />
      </div>
    </section>
  );
};

export default ShoppingCart;

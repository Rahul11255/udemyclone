import React, { useState } from "react";
import { useCart } from "react-use-cart";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";


const ShoppingCart = () => {
  const { totalItems, items, updateItemQuantity, removeItem, emptyCart, isEmpty } = useCart();
  const [address, setAddress] = useState({
    landmark: "",
    houseNo: "",
    city: "",
    pincode: ""
  });

  const handleAddressChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value
    });
  };

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (isEmpty) return <EmptyCart />;
  
  // Function to generate full address
  const generateFullAddress = () => {
    return `${address.houseNo}, ${address.landmark}, ${address.city} - ${address.pincode}`;
  };

  // Function to handle placing the order
  const placeOrder = () => {
    // Prepare data to be logged
    const orderData = {
      items: items,
      address: address,
      totalAmount: subtotal
    };
  
    // Log order data to the console
    console.log("Order placed:", orderData);
    emptyCart()
    setAddress({
      landmark: "",
      houseNo: "",
      city: "",
      pincode: ""
    })

  };
  //   

  return (
    <section className="cart_container">
      <div className="cart_grid">
        <div className="cart_item">
          <div className="cart_title">
            <h6>My Cart :</h6> <p>{totalItems} Items</p>{" "}
          </div>
          {items.map((item, key) => {
            // Calculate total price for each item
            const totalPrice = item.price * item.quantity;

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
                    <p>${item.price}</p>
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
                {/* Display total price for the item */}
                <div className="product_total_price">Total Price: ${totalPrice.toFixed(2)}</div>
              </div>
            );
          })}
          <div className="cart_buttons">
            <Link className="link" to={'/product'}>
              <Button>CONTINUE SHOPPING</Button>
            </Link>
            <Button onClick={emptyCart}>CLEAR CART</Button>
          </div>
        </div>
        <div className="cart_total">
          <div className="sub_total">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="address_input">
            <TextField
              label="Landmark"
              size="small"
              variant="outlined"
              name="landmark"
              value={address.landmark}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="House Number"
              variant="outlined"
              name="houseNo"
              value={address.houseNo}
              onChange={handleAddressChange}
              fullWidth
              size="small"
              margin="normal"
            />
            <TextField
              label="City"
              variant="outlined"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              fullWidth
              size="small"
              margin="normal"
            />
            <TextField
              label="PIN code"
              variant="outlined"
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              fullWidth
              size="small"
              margin="normal"
            />
          </div>
          {/* Display full address */}
          <div className="full_address">
            <p> <b> Full Address</b></p>
            <p>{generateFullAddress()}</p>
          </div>
          <div className="place_order">
            <Button onClick={placeOrder}>Place Order</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

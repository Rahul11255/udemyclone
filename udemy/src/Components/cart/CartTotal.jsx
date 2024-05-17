import React from "react";
import { Button, TextField } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";

const CartTotal = ({
  totalAmount,
  pricewithoutdiscount,
  discount,
  shippingCharges,
  generateFullAddress,
  handlePlaceOrder,
  address,
  errors,
  handleAddressChange,

}) => {
  return (
    <div className="cart_total">
      <div className="sub_total">
        <p>Price</p>
        <p>₹{pricewithoutdiscount}</p>
      </div>
      <div className="sub_total">
        <p>
          Discount <DiscountIcon sx={{ ml: "5px", color: "grey" }} />
        </p>
        <p style={{ color: "#32CD32" }}>-₹{discount}</p>
      </div>
      <div className="sub_total">
        <p>
          Delivery Charges
          <LocalShippingIcon sx={{ ml: "5px", color: "grey" }} />
        </p>
        <p>₹{shippingCharges}</p>
      </div>
      <div className="sub_total">
        <p>Total Amount</p>
        <p style={{ color: "black" }}>₹{totalAmount}</p>
      </div>
      <div className="sub_total">
        <p style={{ color: "#32CD32", fontWeight: "bold" }}>
          You will save ₹{discount} on this order
        </p>
      </div>
      <div className="address_input">
        <div className="address_row">
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={address.name}
            onChange={handleAddressChange}
            fullWidth
            size="small"
            margin="normal"
            required
            error={errors.name}
            helperText={errors.name && "Name is required"}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleAddressChange}
            fullWidth
            size="small"
            margin="normal"
            required
            error={errors.phoneNumber}
            helperText={errors.phoneNumber && "Phone no is required"}
          />
        </div>
        <div className="address_row">
          <TextField
            label="House Number"
            variant="outlined"
            name="houseNo"
            value={address.houseNo}
            onChange={handleAddressChange}
            fullWidth
            size="small"
            margin="normal"
            required
            error={errors.houseNo}
            helperText={errors.houseNo && "House no is required"}
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
            required
            error={errors.city}
            helperText={errors.city && "City is required"}
          />
        </div>
        <div className="address_row">
          <TextField
            label="PIN code"
            variant="outlined"
            name="pincode"
            value={address.pincode}
            onChange={handleAddressChange}
            fullWidth
            size="small"
            margin="normal"
            required
            error={errors.pincode}
            helperText={errors.pincode && "PIN code is required"}
          />
          <TextField
            label="Landmark"
            size="small"
            variant="outlined"
            name="landmark"
            value={address.landmark}
            onChange={handleAddressChange}
            fullWidth
            margin="normal"
            required
            error={errors.landmark}
            helperText={errors.landmark && "Landmark is required"}
          />
        </div>
      </div>
      <div className="full_address">
        <p>
          <b> Full Address</b>
        </p>
        <p>{generateFullAddress()}</p>
      </div>
      <div className="place_order">
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>
  );
};

export default CartTotal;

const mongoose = require('mongoose');
// Define the schema for the item
const itemSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    quantity: Number,
    thumbnail: String,
    rating: Number,
    discountPercentage: Number,
    description: String,
    images: [String],
    itemTotal: Number,
    stock: Number,
    brand:String
});

// Define the schema for the address
const addressSchema = new mongoose.Schema({
  landmark: String,
  houseNo: String,
  city: String,
  pincode: String
});

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  items: [itemSchema], // Array of items
  address: addressSchema, // Address object
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now } // Timestamp of when the order was created
});

// Create a model based on the order schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
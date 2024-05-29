const mongoose = require('mongoose');
// Define the schema for the item
const itemSchema = new mongoose.Schema({
    title: String,
    slug:String,
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
  name:String,
  phoneNumber:Number,
  landmark: String,
  houseNo: String,
  city: String,
  pincode: String
});

const historySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  orderID:String,
  items: [itemSchema], // Array of items
  address: addressSchema, // Address object
  totalAmount: Number,
  discount:Number,
  pricewithoutdiscount:Number,
  userid:String,
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  history: [historySchema], // Add the history field
  
},{ timestamps: true });

// Create a model based on the order schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

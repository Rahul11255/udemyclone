const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  rating: { type: Number,},
  discountPercentage: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  id: {
    type: String,
    default: function () {
      return Date.now().toString(); // Picks current time as ID
    },
    unique: true // Ensure uniqueness
  }
},{ timestamps: true });

module.exports = mongoose.model('Product',productSchema)
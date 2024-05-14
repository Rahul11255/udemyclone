const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const slugify = require('slugify');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Check admin role
const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user.role === "admin";
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
};

const createProduct = async (req, res) => {
  try {
    // Check if user has admin role
    if (!(await checkAdminRole(req.user.id))) {
      return res.status(403).json({ message: "user does not have admin role" });
    }

    const {
      title,
      category,
      price,
      thumbnail,
      rating,
      discountPercentage,
      description,
      images,
      stock,
      brand
    } = req.body;

    // Upload thumbnail
    const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath);
    // Remove thumbnail temp file
    fs.unlink(req.files.thumbnail.tempFilePath, (err) => {
      if (err) {
        console.error("Error deleting thumbnail temp file:", err);
      }
    });

    // Upload images
    const imagesUploadPromises = req.files.images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.tempFilePath);
      // Remove image temp file
      fs.unlink(image.tempFilePath, (err) => {
        if (err) {
          console.error("Error deleting image temp file:", err);
        }
      });
      return result.url;
    });

    // Wait for all images to upload
    const imagesUrls = await Promise.all(imagesUploadPromises);


    // Save data to database
    const product = await Product.create({
      title,
      slug: slugify(title).toLowerCase(),
      category,
      price,
      thumbnail: thumbnailUpload.url,
      rating,
      discountPercentage,
      description,
      images: imagesUrls,
      stock,
      brand
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Create order
const ordered = async (req, res) => {
  try {
    const userOrder = req.body;
    const newOrder = await Order.create(userOrder);
    res.status(200).json({
      message: "Ordered successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "An error occurred while processing the order" });
  }
};

module.exports = { ordered, createProduct };

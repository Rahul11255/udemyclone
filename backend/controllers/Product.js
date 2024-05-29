const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const slugify = require('slugify');
const orderIdGenerator = require('order-id')('mysecret');

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
      return res.status(403).json({ message: "User does not have admin role" });
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
    fs.unlinkSync(req.files.thumbnail.tempFilePath);
    console.log("Thumbnail temp file deleted.");

    // Upload images
    const imagesUploadPromises = req.files.images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.tempFilePath);
      // Remove image temp file
      fs.unlinkSync(image.tempFilePath);
      console.log("Image temp file deleted.");
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

const getAllProducts = async (req ,res)=>{
     try {
      
      const products = await Product.find({})
      res.status(200).json({product:products})

     } catch (error) {
          console.error(error);
      res.status(500).json({ error: "An error occurred, products not found" });
     }
}


const getSingleProducts = async (req ,res)=>{
  try {
   const slug = req.params.slug.toLowerCase();
   const products = await Product.findOne({ slug })
   res.status(200).json(products)
  } catch (error) {
       console.error(error);
   res.status(500).json({ error: "An error occurred, products not found" });
  }
}


const updateProduct = async (req, res, next) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const updatedProduct = await Product.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    next(err);
  }
};





// Create order
const ordered = async (req, res) => {
  try {
    const userID = req.user.id;
    const { items, address, totalAmount, discount, pricewithoutdiscount } = req.body;

    // Ensure that all required fields are present
    if (!items || !address || !totalAmount || !discount || !pricewithoutdiscount) {
      return res.status(400).json({ error: "Missing required order data" });
    }

    // Generate a unique order ID
    const orderID = orderIdGenerator.generate();

    const newOrder = await Order.create({
      items,
      address,
      totalAmount,
      discount,
      pricewithoutdiscount,
      userid: userID,
      orderID
    });

    res.status(200).json({
      message: "Ordered successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "An error occurred while processing the order" });
  }
};

// update order status by admin 
const updateOrderStatus= async ( req, res)=>{
  try {

     // Check if user has admin role
     if (!(await checkAdminRole(req.user.id))) {
      return res.status(403).json({ message: "User does not have admin role" });
    }


    const  id = req.params.id;
    const { status } = req.body;
    const orderExist = await Order.findById(id);
    
    if(!orderExist){
      return res.status(401).json({msg:"Ordee not found"});
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: { status }, $push: { history: { status, timestamp: Date.now() } } },
      { new: true } // Return the updated document
    );

    console.log("order status updated")
      
    res.status(200).json({ message: 'Order status updated',order});

  }  catch (error) {
    console.error('Error updating order status', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders and sort them by creation date in descending order
    const allOrders = await Order.find({}).sort({ createdAt: -1 });

    // Process orders to remove 'images' field from 'items' array
    const ordersWithoutImages = allOrders.map(order => {
      const itemsWithoutImages = order.items.map(item => {
        const { images, description, brand, rating, ...itemWithoutImages } = item.toObject(); // Convert item to plain object and exclude images
        return itemWithoutImages;
      });
      return {
        ...order.toObject(),
        items: itemsWithoutImages
      };
    });

    res.status(200).json({ order: ordersWithoutImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred, Order not found" });
  }
};

const getOrderwithUserID = async (req, res) => {
  try {
    const userId = req.user.id;
    // Using projection to exclude the address field
    const userOrder = await Order.find({ userid: userId }).select('-address').sort({ createdAt: -1 });

    if (!userOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({order:userOrder});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred, Order not found" });
  }
};



const searchProducts = async(req,res)=>{
   try{
       const {search} = req.params
       console.log(search)
       const product = await  Product.find({

          "$or":[
            { "category":{$regex:search , $options:"i"}},
            { "brand":{$regex:search , $options:"i"}},
            { "title":{$regex:search , $options:"i"}},
            { "description":{$regex:search , $options:"i"}}
          ]
       })
       res.status(200).json({product:product})
   }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
   }
}


module.exports = { getAllOrders };




module.exports = { ordered, createProduct ,getAllProducts,getSingleProducts,updateProduct ,getAllOrders,searchProducts ,getOrderwithUserID,updateOrderStatus};

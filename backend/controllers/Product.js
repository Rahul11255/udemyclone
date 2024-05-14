const Order = require("../models/Order")
const Product = require("../models/Product")

const createProduct= async(req,res)=>{
     const {title,slug,category,price,thumbnail,rating,discountPercentage,description,images,stock,brand} = req.body
}











const ordered = async (req, res) => {
    try {
      const userOrder = req.body;
      const newOrder = await Order.create(userOrder); // Assuming Order is your Mongoose model
      res.status(200).json({
        message: "Ordered successfully",
        order: newOrder,
      });
    } catch (error) {
      // Log and handle errors
      console.error(error);
      res.status(500).json({ error: "An error occurred while processing the order" });
    }
};


module.exports = {ordered}
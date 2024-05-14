const User = require("../models/User");
const bcrypt = require("bcrypt");
const {generateToken} = require('../jwt')

const signupUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const { fname, lname, email, password,role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ fname, role,lname, email, password: hashedPassword });
    const savedUSer = await newUser.save();

    res.status(200).json({
      message: "Signup Success Please Signin",
      user: savedUSer,
    });
  } catch (error) {
    // Log and handle errors
    console.log(error);
    res.status(500).json({ error: "An error occurred while registering" });
  }
};


const loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    // Find user by email in the database
    const user = await User.findOne({ email });
    // If user does not exist, return error
    if (!user) {
      return res.status(400).json({ error: "Invalid Email Address" });
    }
    // Compare password hashes to verify password correctness
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(400).json({ error: "Invalid  password" });
    }
    
    const payload = {
      id: user.id,
    }
    const token = generateToken(payload)
    res
      .status(200)
      .json({ message: "Login successful", user: user ,token:token});
  } catch (error) {
    // Log and handle errors
    console.error(error);
    res.status(500).json({ error: "An error occurred while user login" });
  }
};











module.exports = { signupUser ,loginUser };

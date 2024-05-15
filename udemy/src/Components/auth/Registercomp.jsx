import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registercomp = () => {
  const navigate = useNavigate();
  const initialFormData = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are provided
    if (!formData.fname || !formData.lname || !formData.email || !formData.password) {
      setFormData({ ...formData, message: "All fields are required." });
      return;
    }

    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post("http://localhost:3000/signup", formData);

      setFormData({ ...initialFormData, message: response.data.message });
      setTimeout(() => {
        navigate('/login');        
      }, 1000);
    } catch (err) {
      console.error("Error logging in:", err);
      setFormData({ ...formData, message: err.response.data.error });
    } finally {
      setLoading(false); // Reset loading after form submission (whether success or error)
    }
  };

  return (
    <div className="register_contaainer">
      <div className="register_img">
        <img
          src="https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
      <div className="register_form_container">
        <div>
          <div className="register_form_text">
            <h1>Create Account</h1>
            <p>Please register below account detail</p>
          </div>
          <div className="message_container">
            <h3 className={formData.message.includes("successful") ? "succ" : "err"}>
              {formData.message}
            </h3>
          </div>
          <div className="register_form">
            <form onSubmit={handleSubmit}>
              <p>First Name</p>
              <input
                onChange={handleChange}
                type="text"
                name="fname"
                value={formData.fname}
                placeholder="First Name"
              />
              <p>Last Name</p>
              <input
                onChange={handleChange}
                type="text"
                value={formData.lname}
                name="lname"
                placeholder="Last Name"
              />
              <p>Email</p>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
              />
              <p>Password</p>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
              />
              <div className="register_btn">
                <Button type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "CREATE"}
                </Button>
              </div>
              <h4>Already an account holder?</h4>
              <Link to={"/login"} className="login_link">
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registercomp;

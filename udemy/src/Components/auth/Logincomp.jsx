import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from "../../assets/login_bg.jpg";

const Logincomp = () => {
  const navigate = useNavigate()
  const initialFormData = {
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

    // Check if email and password are provided
    if (!formData.email || !formData.password) {
      setFormData({ ...formData, message: "Email and password are required." });
      return;
    }

    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      const {role} = response.data.user
      // Inside handleSubmit function after successful login
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('role', role);
      localStorage.setItem('token',response.data.token)

      setFormData({ ...initialFormData, message: response.data.message });
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
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
        <img src={loginimg} alt="login-imgage" />
      </div>
      <div className="register_form_container">
        <div>
          <div className="register_form_text">
            <h1>Login</h1>
            <p>Please login below account detail</p>
          </div>
          <div className="message_container">
            <h3
            className={formData.message.includes("successful") ? "succ" : "err"}
            >{formData.message}</h3> 
            {/* <h3>hye</h3> */}
          </div>
          <div className="register_form">
            <form onSubmit={handleSubmit}>
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <div className="register_btn">
                <Button type="submit" disabled={loading}>
                  {loading ? "Signing In..." : "SIGN IN"}
                </Button>
              </div>
              <h4>Don't have an account?</h4>
              <Link to={"/register"} className="login_link">
                Create account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logincomp;

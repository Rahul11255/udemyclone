import React, { useEffect } from 'react';
import AdminComp from '../Components/admin/AdminComp';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const isAdminLoggedIn = () => {
    return (
      localStorage.getItem("isLoggedIn") === "true" &&
      localStorage.getItem("role") === "admin"
    );
  };

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      // Redirect to login page if not logged in as admin
      navigate("/");
    } else {
      // protectAdmin();
    }
  }, [navigate]);

  const protectAdmin = () => {
    const password = "3013"; // Ensure password is a string
    const inputfield = prompt("Enter Password  two times");
    if (inputfield !== password) {
      navigate("/");
      alert("Wrong Pass Key")
    }
  };

  return (
    <>
      {isAdminLoggedIn() && <AdminComp />}
    </>
  );
};

export default Admin;

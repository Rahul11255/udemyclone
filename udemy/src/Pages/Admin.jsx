import React, { useEffect } from 'react'
import AdminComp from '../Components/admin/AdminComp'
import { useNavigate } from 'react-router-dom';

const Admin = () => {


  const isAdminLoggedIn = () => {
    return (
      localStorage.getItem("isLoggedIn") === "true" &&
      localStorage.getItem("role") === "admin"
    );
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      // Redirect to login page if not logged in as admin
      return navigate("/");
    }
  });
  
  return (
    <>
   <AdminComp/>
    </>
  )
}

export default Admin
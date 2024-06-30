import React, { useState, useEffect } from 'react';
import AdminComp from '../Components/admin/AdminComp';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Admin = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(true); // Open dialog initially
  const [password, setPassword] = useState('');

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
      setDialogOpen(true); // Open the password dialog
    }
  }, [navigate]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/"); // Navigate to login page if dialog is closed
  };

  const handleDialogConfirm = () => {
    const correctPassword = "3013"; // Ensure password is a string
    if (password === correctPassword) {
      setDialogOpen(false); // Close the dialog if the password is correct
    } else {
      alert("Wrong Pass Key");
      navigate("/");
    }
  };

  return (
    <>
      {isAdminLoggedIn() && <AdminComp />}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Enter Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the password to access the admin area.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
    </>
  );
};

export default Admin;

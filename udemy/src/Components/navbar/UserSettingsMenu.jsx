// UserSettingsMenu.js
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const settings = [
  {name:"Profile",Link:"/account"},
  {name:"Logout"}
];

function UserSettingsMenu({ anchorEl, handleClose }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    handleClose();
    setOpenDialog(false);
    window.location.href = "/login"; // Redirect to login page
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",  
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {settings.map((setting, index) =>
          setting.name === "Logout" ? (
            <MenuItem key={index} onClick={handleOpenDialog}>
               <Typography textAlign="center">{setting.name}</Typography> 
            </MenuItem>
          ) : (
            <MenuItem key={index} onClick={handleClose}>
             <Link  className="nav_list_items" to={'/account'}>  <Typography textAlign="center">{setting.name}</Typography> </Link>
            </MenuItem>
          )
        )}
      </Menu>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">Cancle</Button>
          <Button onClick={handleLogout} variant="contained" color="error" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserSettingsMenu;

// UserAuthMenu.js
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const auth = [
  {name:"Login",to:"/login"},
  {name:"Register",to:"/register"}
];

function UserAuthMenu({ anchorEl, handleClose }) {
  return (
    <Menu
      sx={{ mt: "45px",ml:"-100px" }}
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
      {auth.map((auths,key) => (
        <MenuItem key={key} onClick={handleClose}>
          <NavLink to={`${auths.to}`} activeclassname="active" className="nav_list_items">
            <Typography textAlign="center">{auths.name}</Typography>
          </NavLink>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default UserAuthMenu;

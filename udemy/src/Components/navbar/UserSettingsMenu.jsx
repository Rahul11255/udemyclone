// UserSettingsMenu.js
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const settings = ["Profile", "Logout"];

function UserSettingsMenu({ anchorEl, handleClose }) {
  return (
    <Menu
    sx={{mt:"45px"}}
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
      {settings.map((setting, index) => (
        <MenuItem key={index} onClick={handleClose}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default UserSettingsMenu;

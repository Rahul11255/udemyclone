// ResponsiveAppBar.js
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useCart } from "react-use-cart";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import { MenuItem } from "@mui/material";
import "./navbar.css";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import UserSettingsMenu from "./UserSettingsMenu";
import UserAuthMenu from "./UserAuthMenu";

const pages = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Pages", link: "/pages" },
  { name: "Contact Us", link: "/contact" },
];
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [authuser, SetAuthuser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  
  const { totalItems } = useCart();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserauth=()=>{
    SetAuthuser(event.currentTarget);
  }

  const handleCloseUserauth=()=>{
    SetAuthuser(null);
  }


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateToProducts=()=>{
    navigate("/products")
  }

  return (
    <AppBar
      position="sticky"
      style={{
        height: "60px",
        backgroundColor: "white",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <NavLink to={"/"} style={{ border: "none" }}>
              <img
                src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                alt="Logo"
                style={{
                  width: "120px",
                  height: "35px",
                  cursor: "pointer",
                }}
              />
            </NavLink>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <NavLink to={"/"} style={{ border: "none" }}>
                <img
                  src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                  alt="Logo"
                  style={{ width: "100px", height: "35px" }}
                />
              </NavLink>
            </div>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page,key) => (
                <MenuItem key={key} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.link}
                    activeclassname="active"
                    className="nav_list_items"
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <ul className="nav_list">
              {pages.map((item, key) => (
                <li key={key}>
                  <NavLink
                    to={item.link}
                    activeclassname="active"
                    className="nav_list_items"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <div className="navbar_right">
              <div className="search-box" onClick={navigateToProducts}>
                <button className="btn-search">
                  <Tooltip title="Search">
                    <SearchIcon />
                  </Tooltip>
                </button>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Type to Search..."
                />
              </div>
              { !isLoggedIn && (
                <div>
                <Tooltip title="Login / Register">
                  <IconButton onClick={handleOpenUserauth} >
                    <PersonOutlineOutlinedIcon sx={{fontSize:30}}/>
                  </IconButton>
                </Tooltip>
              </div>
              )}
              { isLoggedIn && localStorage.getItem("role") === "admin" &&  (
                <div>
                <Tooltip title="Admin">
                 <Link to={'/admin'} className="nav_list_items" >
                  <IconButton>
                    <AdminPanelSettingsIcon sx={{fontSize:30}}/>
                  </IconButton>
                  </Link>
                </Tooltip>
              </div>
              )}
             
              <div>
                <Tooltip title="Cart">
                  <IconButton>
                    <StyledBadge badgeContent={totalItems} color="primary">
                      <NavLink to={"/user-cart"}  className="nav_list_items" style={{border:"none",color:"grey"}}>
                        <ShoppingCartOutlinedIcon />
                      </NavLink>
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </div>
              { isLoggedIn && (
                <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg  "
                    />
                  </IconButton>
                </Tooltip>
              </div>
              )}
             
            </div>
            <UserSettingsMenu anchorEl={anchorElUser} handleClose={handleCloseUserMenu} />
            <UserAuthMenu anchorEl={authuser} handleClose={handleCloseUserauth} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

// ResponsiveAppBar.js
import React from "react";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import { MenuItem } from "@mui/material";
import "./navbar.css";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const pages = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Collection", link: "/collection" },
  { name: "Pages", link: "/pages" },
  { name: "Contact Us", link: "/contact" },
];
const settings = ["Profile", "Logout"];
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [cartItemCount, setCartItemCount] = React.useState(0);

  // React.useEffect(() => {
  //   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  //   const totalCount = cartItems.reduce(
  //     (acc, item) => acc + item.quantity,
  //     0
  //   );
  //   setCartItemCount(totalCount);

  // }, []);

  const { totalItems } = useCart();
  console.log("asdfasdf", totalItems);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{
        height: "100px",
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
            <NavLink to={"/"} style={{border:"none"}}>
              <img
                src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                alt="Logo"
                style={{
                  width: "130px",
                  height: "45px",
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
             <NavLink to={"/"} style={{border:"none"}}>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <NavLink to={page.link} activeClassName="active" className="nav_list_items" >
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
                  <NavLink to={item.link} activeClassName="active" className="nav_list_items">
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div className="navbar_right">
              <div className="search-box">
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
              {/* <div>
                <Tooltip title="Wishlist">
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              </div> */}
              <div>
                <Tooltip title="Cart">
                  <NavLink to={"/user-cart"}>
                    <IconButton>
                      <StyledBadge badgeContent={totalItems} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </StyledBadge>
                    </IconButton>
                  </NavLink>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

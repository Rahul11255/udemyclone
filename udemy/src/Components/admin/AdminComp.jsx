import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Listitems from "./Listitems";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Dashboard from "./Dashboard";
import CreateProduct from "./createproduct/CreateProduct";
import ListofProducts from "./list of products/ListofProducts";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import OrderList from "./orderlist/OrderList";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ordericon from "../../assets/checklist.png";
import ListofUsers from "./list of users/ListofUsers";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminComp() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menuData, setMenudata] = React.useState("createProduct");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#5769EE" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin E-Commerce
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Listitems
            selected={menuData === "dashboard"}
            onClick={() => setMenudata("dashboard")}
            text={"DashBoard"}
            icons={<DashboardIcon />}
          />
          <Listitems
            selected={menuData === "createProduct"}
            onClick={() => setMenudata("createProduct")}
            text={"Add Products"}
            icons={<AddCircleIcon />}
          />
          <Listitems
            selected={menuData === "ListofProducts"}
            onClick={() => setMenudata("ListofProducts")}
            text={"List of Products"}
            icons={<FormatListNumberedIcon />}
          />
          {/* "#B9D9EB" */}
          <ListItemButton sx={{backgroundColor: menuData == "listoforders" ? "#B9D9EB":""}}> 
            <ListItemText>
              <div style={{display:'flex',alignItems:"center",gap:"22px",}} 
              onClick={()=> setMenudata("listoforders")}
              >
               <img src={ordericon} width={35} height={35} alt="orderlist" />
                <p>List of Order</p>
               </div>  
              </ListItemText> 
          </ListItemButton>
          <Listitems
            selected={menuData === "listofusers"}
            onClick={() => setMenudata("listofusers")}
            text={"List of Users"}
            icons={<PeopleAltIcon />}
          />
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <Link to={"/"}>
              <ListItemText>
                <HomeIcon sx={{ fontSize: 33, color: "#5567EE" }} />
                
              </ListItemText>
            </Link>
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        {menuData === "dashboard" && <Dashboard />}
        {menuData === "createProduct" && <CreateProduct />}
        {menuData === "ListofProducts" && <ListofProducts />}
        {menuData === "listoforders" && <OrderList />}
        {menuData === "listofusers" && <ListofUsers />}
      </Box>
    </Box>
  );
}

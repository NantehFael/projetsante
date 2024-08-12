import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#222",
    },
    secondary: {
      main: "#4caf50", // Green color for buttons
    },
  },
  typography: {
    fontSize: 16,
    h6: {
      fontSize: '1.25rem',
    },
    button: {
      fontSize: '1rem',
    },
  },
});

const drawerWidth = 240;

const navItems = [
  { item: "Formation", rout: "/formation" },
  { item: "Personnel", rout: "/personnel" },
  { item: "Planifier", rout: "/planifier" },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavItemClick = (route) => {
    navigate(route);
    handleDrawerToggle(); // Close drawer on item click
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sante
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.item} disablePadding>
            <ListItemButton onClick={() => handleNavItemClick(item.rout)}>
              <ListItemText primary={item.item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ boxShadow: 0, height: '80px' }}>
          <Toolbar sx={{ height: '100%' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, fontSize: '1.5rem' }}
            >
              Sante
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.item}
                  sx={{ color: "white", fontSize: '1rem', '&:hover': { backgroundColor: theme.palette.secondary.main } }}
                  onClick={() => handleNavItemClick(item.rout)}
                >
                  {item.item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f4f4f4", // Light background for drawer
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;

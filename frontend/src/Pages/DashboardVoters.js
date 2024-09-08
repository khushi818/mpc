import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../Context/authContext'

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const DashboardVoters = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { logout } = useAuth()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[{name : 'Vote' , icon : <HowToVoteIcon /> , link : '/vote'}, {name : 'Profile' , icon : <PersonIcon/> , link : '/profile'}].map((fields, index) => (
          <Link to={fields.link}>
          <ListItem button key={fields.name} style ={{ cursor : 'pointer' }}>
            <ListItemIcon>
              {fields.icon}
            </ListItemIcon>
            <ListItemText primary={fields.name} />
          </ListItem>
          </Link>
        ))}
        <Link to="/">
        <ListItem onClick= {() => { 
          sessionStorage.clear() 
          logout()
          }}style ={{ cursor : 'pointer' }}>
          <ListItemIcon><LogoutIcon/></ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
        </Link>
      </List>
      
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Vice President
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            display: { xs: 'none', sm: 'block' },
          }}
          open
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Typography >
            <Outlet/>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardVoters;

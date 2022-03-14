import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "gatsby-theme-material-ui";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import * as styles from "./responsive-app-bar.module.css";

const pages = ['Home', 'About', 'Classes', 'Blog', 'Bookshop', 'Donate', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = ({logo}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    <AppBar position="static" color="transparent" className={styles.root}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link  to='/'>
            <div>
              {logo && logo.asset && (
                <img
                  src={imageUrlFor(buildImageObj(logo))
                    .width(170)
                    .height(170)
                    .url()}
                  alt={logo.alt}
                />
              )}
            </div>
          </Link>

          <div className={styles.navlinks} >
            {pages.map((page) => (
                <Link to={page} sx={{
                  textDecoration: 'none',
                  color: 'rgb(68, 68, 68)',
                  fontSize: '20px',
                  marginLeft: '20px',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  borderBottom: '2px solid transparent',
                  '&:hover': {
                    color: 'rgb(68, 68, 68)',
                    borderBottom: '2px solid rgb(68, 68, 68)',
                  },
                }}>
                  {page}
                </Link>
              ))}
            
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
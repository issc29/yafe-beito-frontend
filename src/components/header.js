import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { Navbar, Nav, Container } from "react-bootstrap";
import ResponsiveAppBar from "./responsive-app-bar";
import NavBar from "./nav-bar";




const Header = ({ onHideNav, onShowNav, showNav, siteTitle, logo }) => (
  <div>
   <NavBar logo={logo}/>
  </div>
);

export default Header;

import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { Navbar, Nav, Container } from "react-bootstrap";
import ResponsiveAppBar from "./responsive-app-bar";
import Example from "./Example";



import * as styles from "./header.module.css";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle, logo }) => (
  <div className={styles.root}>
   <Example logo={logo}/>
  </div>
);

export default Header;

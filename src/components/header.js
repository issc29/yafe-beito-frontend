
import React from "react";
import NavBar from "./nav-bar";




const Header = ({ onHideNav, onShowNav, showNav, siteTitle, logo }) => (
  <div>
   <NavBar logo={logo}/>
  </div>
);

export default Header;

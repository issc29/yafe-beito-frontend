import React from "react";
import Header from "./header";

import Footer from "./footer";


const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, logo, bgImage }) => (
    <div  className="bg-[length:100%_auto]" style={{backgroundImage:`url(${bgImage})`}}>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} logo={logo}/>
      <div >{children}</div>
      <Footer/>
    </div>
);

export default Layout;

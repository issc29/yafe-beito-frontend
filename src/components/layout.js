import React from "react";
import Header from "./header";

import Footer from "./footer";


const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, logo, bgImage, hideFooter }) => (
    <div  className="bg-cover bg-top bg-no-repeat min-h-screen relative" style={{backgroundImage:`url(${bgImage})`}}>
      <div className="pb-28">
        <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} logo={logo}/>
        <div >{children}</div>
      </div>
      {(hideFooter) ? <></> : <Footer />}
      
    </div>
);

export default Layout;

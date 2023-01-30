import React from "react";
import Header from "./header";
import Footer from "./footer";
import { CookiesProvider } from "react-cookie";


const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, logo, bgImage, hideFooter, bgResizable }) => (
  <CookiesProvider>
    <div  className={`${(bgResizable) ? "bg-[length:100%_100%] bg-fixed" : "bg-cover"} bg-top bg-no-repeat min-h-screen relative`} style={{backgroundImage:`url(${bgImage})`}}>
      <div className="pb-28">
        <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} logo={logo}/>
        <div >{children}</div>
      </div>
      {(hideFooter) ? <></> : <Footer />}
    </div>
  </CookiesProvider>
);

export default Layout;

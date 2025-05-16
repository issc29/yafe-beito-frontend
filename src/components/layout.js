import React from "react";
import Header from "./header";
import Footer from "./footer";
import { CookiesProvider } from "react-cookie";


const Layout = ({ children, logo, bgImage, hideFooter, bgResizable, bgFixed }) => (
  <CookiesProvider>
    <div className={`${(bgResizable) ? "bg-[length:100%_100%] bg-fixed" : "bg-cover"} ${(bgFixed) ? "bg-fixed" : ""} bg-top bg-no-repeat min-h-screen relative`} style={{backgroundImage:`url(${bgImage})`}}>
      <div className="pb-28">
        <Header logo={logo}/>
        <div >{children}</div>
      </div>
      {(hideFooter) ? <></> : <Footer />}
    </div>
  </CookiesProvider>
);

export default Layout;

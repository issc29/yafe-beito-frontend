import React from "react";
import Header from "./header";

import "../styles/layout.css";
import * as styles from "./layout.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./footer";


const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, logo, bgImage }) => (
    <div className={styles.layoutMain} style={{backgroundImage:`url(${bgImage})`}}>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} logo={logo}/>
      <div className={styles.content}>{children}</div>
      <Footer/>
    </div>
);

export default Layout;

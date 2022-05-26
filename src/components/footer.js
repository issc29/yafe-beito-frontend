import { Link } from "gatsby";
import React from "react";
import fbIcon from '../images/fb.png'
import igIcon from '../images/ig.png'
import ytIcon from '../images/yt.png'

import * as styles from "./layout.module.css";

const Footer = () => (
  <footer className="bg-dark-blue text-white py-4">
      <div >
        <div className="flex items-center justify-center">
          <a href="https://www.facebook.com/profile.php?id=100075891844001/" target="_blank">
            <img src={fbIcon} className="h-12 w-12" />
          </a>
          <a href="https://www.youtube.com/channel/UCzHh9EVGZ9O3WtTGL8bp7lw" target="_blank">
            <img src={ytIcon} className="h-12 w-12" />
          </a>
          <a href="https://www.instagram.com/yafebeito/" target="_blank">
            <img src={igIcon} className="h-12 w-12" />
          </a>
        </div>
        <div className={styles.siteInfo}>
          © {new Date().getFullYear()} by Yafe Beito: Hakham Dr. José Faur Studies Foundation
          <br/>Site built with <a href="https://www.sanity.io">Sanity</a> &amp;
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer>
);

export default Footer;

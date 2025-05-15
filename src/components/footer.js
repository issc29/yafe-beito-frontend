import React from "react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";

import * as styles from "./layout.module.css";

const Footer = () => (
  <footer className="bg-dark-blue text-white py-4 absolute bottom-0 inset-x-0 ">
      <div >
        <div className="flex items-center justify-center mb-3">
          <a href="https://wa.me/+19292243903" target="_blank">
            <FaWhatsapp className="mx-2" size="3em"/>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100075891844001" target="_blank">
            <FaFacebook className="mx-2" size="3em"/>
          </a>
          <a href="https://m.youtube.com/@yafebeito8160" target="_blank">
            <FaYoutube className="mx-2" size="3em"/>
          </a>
          <a href="https://www.instagram.com/yafebeito/" target="_blank">
            <FaInstagram className="mx-2" size="3em"/>
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

import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import * as styles from "./header.module.css";

const Header2 = ({ onHideNav, onShowNav, showNav, siteTitle, logo }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>
        <Link className={styles.root} to='/'>
          <div>
            {logo && logo.asset && (
              <img
                src={imageUrlFor(buildImageObj(logo))
                  .width(170)
                  .height(170)
                  .url()}
                alt={logo.alt}
              />
            )}
          </div>
        </Link>
      </div>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link to="/archive/">Home</Link>
          </li>
          <li>
            <Link to="/archive/">About</Link>
          </li>
          <li>
            <Link to="/archive/">Classes</Link>
          </li>
          <li>
            <Link to="/archive/">Blog</Link>
          </li>
          <li>
            <Link to="/archive/">Book Shop</Link>
          </li>
          <li>
            <Link to="/archive/">Donate</Link>
          </li>
          <li>
            <Link to="/archive/">Archive</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header2;

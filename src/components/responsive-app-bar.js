import * as React from 'react';
import {Navbar, Nav, Container, NavDropdown, Dropdown, NavItem, NavLink} from "react-bootstrap" 
import { Link } from "gatsby-theme-material-ui";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import * as styles from "./responsive-app-bar.module.css";

const pages = ['Home', 'About', 'Classes', 'Blog', 'Bookshop', 'Donate', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = ({logo}) => {
  const [isOpened, setIsOpened] = React.useState(false);


  const handleDropdownOpen = () => {
    setIsOpened(true);
    
  };

  const handleDropdownClose = () => {
    setIsOpened(false);
  };

  return (
    <Navbar bg="transparent" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          {logo && logo.asset && (
              <img
                src={imageUrlFor(buildImageObj(logo))
                  .width(170)
                  .height(170)
                  .url()}
                alt={logo.alt}
              />
            )}
        </Navbar.Brand>
    <Nav className="me-auto">
    {pages.map((page) => (
      <Nav.Link className={styles.navLinks} href={page}>{page}</Nav.Link>
    ))}

    <Dropdown as={NavItem}
      onMouseEnter = { handleDropdownOpen }
      onMouseLeave = { handleDropdownClose }>
      <Dropdown.Toggle as={NavLink} className={styles.navLinks}>Click to see more…</Dropdown.Toggle>
      <Dropdown.Menu className={styles.dropMenu}
        show={ isOpened }>
        <Dropdown.Item>Hello there!</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>;
    </Nav>
    </Container>
  </Navbar>
  );
};
export default ResponsiveAppBar;
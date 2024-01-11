import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Element } from "react-scroll";

function NavigationBar() {
  const [expanded, setExpanded]=useState(false);
  const closeMenu=()=>{
    setExpanded(false);
  }
  return (
    <Navbar className="bg-green nav-dark" expand="lg" expanded={expanded}>
      <Container className="height-cont">
        <Link
          className="nav-link"
          to="sectionHome" // Replace with the ID of the section you want to scroll to
          spy={true}
          smooth={true}
          offset={-70} // Adjust the offset as needed
          duration={500}
        >
          <img className="logo" src="/src/assets/elegant-logo.png" alt="Logo"  />
          {/* <h2>Elegant Infotech</h2> */}
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"   onClick={() => setExpanded(!expanded)}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto tab">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <Link
              className="nav-link"
              to="sectionHome" // Replace with the ID of the section you want to scroll to
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset as needed
              duration={500}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              className="nav-link"
              to="sectionAboutUs" // Replace with the ID of the section you want to scroll to
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset as needed
              duration={500}
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link
              className="nav-link"
              to="sectionRegister" // Replace with the ID of the section you want to scroll to
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset as needed
              duration={500}
              onClick={closeMenu}
            >
              Register
            </Link>

            <Link
              className="nav-link"
              to="sectionGallery" // Replace with the ID of the section you want to scroll to
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset as needed
              duration={500}
              onClick={closeMenu}
            >
              Courses
            </Link>
            <Link
              className="nav-link"
              to="sectionContactUs" // Replace with the ID of the section you want to scroll to
              spy={true}
              smooth={true}
              offset={-70} // Adjust the offset as needed
              duration={500}
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            {/* <Nav.Link onClick={closeMenu} href="#about">About</Nav.Link>
          <NavDropdown title="Services" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={closeMenu} href="#service1">Service 1</NavDropdown.Item>
            <NavDropdown.Item onClick={closeMenu} href="#service2">Service 2</NavDropdown.Item>
          </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

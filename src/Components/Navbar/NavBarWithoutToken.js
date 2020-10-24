import React, { Component } from "react";
import { Navbar, Nav} from "react-bootstrap";

class NavbarWithoutToken extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">React-Ecom</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Sign-Up</Nav.Link>
              <Nav.Link href="/sign-in">Sign-In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavbarWithoutToken;

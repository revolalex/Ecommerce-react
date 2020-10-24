import React, { Component } from "react";
import CartComponent from "./CartComponent";
import ProfilPictureComoponent from "./ProfilPictureComponent";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

class NavbarWithToken extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">React-Ecom</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/addProduct">Add Product</Nav.Link>
              <Nav.Link href="/list-of-products">Products List</Nav.Link>
              <Nav.Link href="/Users-List">Users List</Nav.Link>
              <Form inline></Form>
              <Nav.Link href="/orders">History</Nav.Link>
            </Nav>
            <Form inline>
              <CartComponent />
              <ProfilPictureComoponent />
              <Button variant="danger" onClick={this.props.onClick}>
                Sign Out
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavbarWithToken;

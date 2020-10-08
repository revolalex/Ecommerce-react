import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class NavBarComponent extends Component {
  render() {
    return (
      <main>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Sign-Up</Nav.Link>
            <Nav.Link href="/sign-in">Sign-In</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search Product</Button>
          </Form>
        </Navbar>
      </main>
    );
  }
}
export default NavBarComponent;

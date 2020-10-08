import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./NavBar.css";

import ProductCardComponet from "./ProductCardComponent";
import ProductCardComponet2 from "./ProductCardComponent2";

import SignupComponent from "./Signup";
import LoginComponent from "./Login";
import AddingProductComponent from "./AddingProductComponent";

export default class Navbare extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">React-Ecom</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Sign-Up</Nav.Link>
                <Nav.Link href="/sign-in">Sign-In</Nav.Link>
                <Nav.Link href="/product">Product</Nav.Link>
                <Nav.Link href="/productCard">ProductCard</Nav.Link>
                <Nav.Link href="/productCard2">ProductCard2</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Product Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          {/* <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">React-Ecom</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Sign-Up</Nav.Link>
                <Nav.Link href="/sign-in">Sign-In</Nav.Link>
                <Nav.Link href="/product">Product</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" />
                <Button className="searchButton" variant="outline-info">
                  Search Product
                </Button>
              </Form>
            </Navbar.Collapse>
          </Navbar> */}
          <Switch>
            <Route path="/ProductCard2">
              <ProductCardComponent2 />
            </Route>
            <Route path="/ProductCard">
              <ProductCardComponent />
            </Route>
            <Route path="/Product">
              <ProductComponentFunction />
            </Route>
            <Route path="/Sign-in">
              <LoginComponents />
            </Route>
            <Route path="/">
              <SignupComponents />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function SignupComponents() {
  return <SignupComponent />;
}

function LoginComponents() {
  return <LoginComponent />;
}

function ProductComponentFunction() {
  return <AddingProductComponent />;
}
function ProductCardComponent() {
  return <ProductCardComponet />;
}
function ProductCardComponent2() {
  return <ProductCardComponet2 />;
}

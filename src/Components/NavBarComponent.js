import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./NavBar.css";

import CreateProductPage from "./CreateProductPage";
import SignupComponent from "./SignupComponent";
import SignInComponent from "./SignInComponent";
import UserListComponent from "./UserListComponent";

//to work on
import ProductCardComponet2 from "./ProductCardComponent2";
import ProductListPage from "./ProductListPage";
import UsersList from "./UserList";

import ListOfProducts from "./ListOfProductsComponent";

export default class Navbare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: [],
    };
    this.DeleteToken = this.DeleteToken.bind(this);
  }
  componentDidMount() {
    this.setState({
      token: localStorage.getItem("token"),
    });
  }
  DeleteToken() {
    
    localStorage.setItem("token", "");

    if (localStorage.getItem("token") === "") {
      console.log("super token effacer");
      this.props.history.push("/sign-in");
    }
  }
  render() {
    let withToken;
    const testToken = localStorage.getItem("token");
    if (testToken) {
      withToken = (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">React-Ecom</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Sign-Up</Nav.Link>
              <Nav.Link href="/sign-in">Sign-In</Nav.Link>
              <Nav.Link href="/addProduct">Product</Nav.Link>
              <Nav.Link href="/Users-List">Users-List</Nav.Link>
              <Nav.Link href="/list-of-products">list-of-products</Nav.Link>
              {/* prototype */}
              <Nav.Link href="/productCard2">ProductCard2</Nav.Link>
              <Nav.Link href="/ProductListPage">ProductListPage</Nav.Link>
              <Nav.Link href="/UsersList">Test</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Product Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
              <Button variant="danger" onClick={this.DeleteToken}>
                Delete token
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      withToken = (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">React-Ecom</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Sign-Up</Nav.Link>
              <Nav.Link href="/sign-in">Sign-In</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="danger" onClick={this.DeleteToken}>
                Delete token
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      );
    }

    return (
      <div>
        <div className="waveBox">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
        <Router id="myNav">
          {withToken}
          <Switch>
            <Route exact path="/" component={SignupComponent}></Route>
            <Route path="/sign-in" component={SignInComponent}></Route>
            <Route path="/addProduct" component={CreateProductPage}></Route>
            <Route path="/Users-List" component={UserListComponent}></Route>
            <Route path="/list-of-products" component={ListOfProducts}></Route>
            {/* prototype */}
            <Route
              path="/productCard2"
              component={ProductCardComponet2}
            ></Route>
            <Route path="/ProductListPage" component={ProductListPage}></Route>
            <Route path="/UsersList" component={UsersList}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

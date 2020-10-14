import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "./NavBar.css";
import {deleteToken,authFalse} from '../store/actions/user'
import { withRouter } from "react-router-dom";
import CreateProductPage from "./CreateProductPage";
import SignupComponent from "./SignupComponent";
import SignInComponent from "./SignInComponent";
import UserListComponent from "./UserListComponent";
import ProductCardComponet2 from "./ProductCardComponent2";
import ListOfProducts from "./ListOfProductsComponent";
import { connect } from "react-redux";

class Navbare extends Component {
  deleteToken() {
    this.props.deleteToken()
    this.props.authFalse()
    this.props.history.push('/')
    window.location.reload();
  }
  render() {
    let withToken;
    const testToken = this.props.token;
    if (testToken) {
      withToken = (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">React-Ecom</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/addProduct">Add Product</Nav.Link>
              <Nav.Link href="/list-of-products">Products List</Nav.Link>
              <Nav.Link href="/Users-List">Users List</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="danger" onClick={this.deleteToken.bind(this)}>
                Sign Out
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      console.log(this.props);

      withToken = (
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
            <Route exact path="/" >
              {this.props.auth === true  ? <Redirect to="/Users-list"/> : <SignupComponent/>}
            </Route>
            <Route path="/sign-in">
              {this.props.auth === true ? <Redirect to="/Users-List"/> : <SignInComponent/>}
            </Route>
            <Route path="/addProduct">
              {this.props.auth === false || undefined ? <Redirect to="/sign-in"/> : <CreateProductPage/>}
            </Route>
            <Route path="/Users-List">
              {this.props.auth === false || undefined ? <Redirect to="/sign-in"/> : <UserListComponent/>}
            </Route>
            <Route path="/list-of-products">
              {this.props.auth === false || undefined ? <Redirect to="/sign-in"/> : <ListOfProducts/>}
            </Route>
            {/* prototype */}
            <Route
              path="/productCard2"
            >
              {this.props.auth === false || undefined ? <Redirect to="/sign-in"/> : <ProductCardComponet2/>}
            </Route>
            <Route render={ () => this.props.auth === false || undefined ? <Redirect to="/"/> : <Redirect to="/Users-List"/> }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  auth: state.userReducer.auth
})

const mapDispatchToProps = {
  deleteToken,
  authFalse
}

export default connect(mapStateToProps,mapDispatchToProps) (withRouter(Navbare));

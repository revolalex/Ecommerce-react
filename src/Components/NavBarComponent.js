import React, { Component } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "./NavBar.css";
import { withRouter } from "react-router-dom";
import MyRouter from "./Router";
import {deleteToken,authFalse} from '../store/actions/user'
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
        {withToken}
        <MyRouter />
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

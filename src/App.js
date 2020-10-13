import React, { Component } from "react";
import Navbar from "./Components/NavBarComponent";
import "./App.css";
// import LoginComponent from "./Components/Login";
// import SignupComponent from "./Components/Signup";
// import AddingProductComponent from "./Components/AddingProductComponent"
// import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import { connect } from "react-redux";
import { setProducts } from "./store/action/products";
import { setToken, deleteToken } from "./store/action/user";

class App extends Component {
  render() {
    return <Navbar />;
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  token: state.userReducer.token,
  users: state.userReducer.users,
});

const mapDispatchToProps = {
  setProducts,
  setToken,
  deleteToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

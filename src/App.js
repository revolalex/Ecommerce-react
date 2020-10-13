import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { setProduct } from "./store/actions/product";
import { setToken, deleteToken } from "./store/actions/user";
import Navbar from "./Components/NavBarComponent";

class App extends Component {
  render() {
    return <Navbar />;
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  token: state.userReducer.token,
  users: state.userReducer.user,
});

const mapDispatchToProps = {
  setProduct,
  setToken,
  deleteToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

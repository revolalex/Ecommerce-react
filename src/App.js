import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { setProduct } from "./store/actions/product";
import { setToken, deleteToken } from "./store/actions/user";
import Navbar from "./Components/NavBarComponent";
import Router from "./Components/Router"
class App extends Component {
  render() {
    return (
    <div>
      <Navbar />
      <Router/>
    </div>
    )
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

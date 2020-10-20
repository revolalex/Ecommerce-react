import React, { Component } from "react";
import Navbar from "./Components/Navbar/NavBarComponent";
import "./App.css";
import { connect } from "react-redux";
import { setListOfProducts } from "./store/actions/product";
import { setToken, deleteToken, setUsers } from "./store/actions/user";

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
  setListOfProducts,
  setToken,
  deleteToken,
  setUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

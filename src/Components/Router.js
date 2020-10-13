import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateProductPage from "./CreateProductPage";
import SignupComponent from "./SignupComponent";
import SignInComponent from "./SignInComponent";
import UserListComponent from "./UserListComponent";
import ProductCardComponet2 from "./ProductCardComponent2";
import ListOfProducts from "./ListOfProductsComponent";

class MyRouter extends Component {
  render() {
    return (
      <Router id="myNav">
        <Switch>
          <Route exact path="/" component={SignupComponent}></Route>
          <Route path="/sign-in" component={SignInComponent}></Route>
          <Route path="/addProduct" component={CreateProductPage}></Route>
          <Route path="/Users-List" component={UserListComponent}></Route>
          <Route path="/list-of-products" component={ListOfProducts}></Route>
          <Route path="/productCard2" component={ProductCardComponet2}></Route>
        </Switch>
      </Router>
    );
  }
}
export default MyRouter

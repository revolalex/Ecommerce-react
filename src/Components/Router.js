import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SignupComponent from "./Sign/SignupComponent";
import SignInComponent from "./Sign/SignInComponent";
import CreateProductPage from "./Product/CreateProductPage";
import UserListComponent from "./UserListComponent";
import ListOfProducts from "./Product/ListOfProductsComponent";
import ProductCardComponent2 from "./Product/ProductCardComponent2";
import BasketComponent from "./Basket/BasketComponent";
import EditProfileComponent from "./Edit/EditProfileComponent"
import EditProductComponent from './Edit/EditProduct';
import OrdersComponent from "./Orders/OrderComponent"
import { deleteToken, authFalse } from "../store/actions/user";
import { connect } from "react-redux";

class MyRouter extends Component {
  render() {
    return (
      <Router id="myNav">
        <Switch>
          <Route exact path="/">
            {this.props.auth === true ? (
              <Redirect to="/Users-list" />
            ) : (
              <SignupComponent />
            )}
          </Route>
          <Route path="/sign-in">
            {this.props.auth === true ? (
              <Redirect to="/Users-List" />
            ) : (
              <SignInComponent />
            )}
          </Route>
          <Route path="/addProduct">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <CreateProductPage />
            )}
          </Route>
          <Route path="/Users-List">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <UserListComponent />
            )}
          </Route>
          <Route path="/editProfil">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <EditProfileComponent />
            )}
          </Route>
          <Route path="/edit-product">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <EditProductComponent />
            )}
          </Route>
          <Route path="/list-of-products">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <ListOfProducts />
            )}
          </Route>
          <Route path="/productCard2">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <ProductCardComponent2 />
            )}
          </Route>
          <Route path="/basket">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <BasketComponent />
            )}
          </Route>
          <Route path="/orders">
            {this.props.auth === false || undefined ? (
              <Redirect to="/sign-up" />
            ) : (
              <OrdersComponent />
            )}
          </Route>
          <Route
            render={() =>
              this.props.auth === false || undefined ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/Users-List" />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  auth: state.userReducer.auth,
  productIdToEdit: state.userReducer.productIdToEdit
});

const mapDispatchToProps = {
  deleteToken,
  authFalse,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyRouter);

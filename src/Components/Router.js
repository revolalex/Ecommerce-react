import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import CreateProductPage from "./CreateProductPage";
import SignupComponent from "./SignupComponent";
import SignInComponent from "./SignInComponent";
import UserListComponent from "./UserListComponent";
import ProductCardComponet2 from "./ProductCardComponent2";
import ListOfProducts from "./ListOfProductsComponent";
import { connect } from 'react-redux';
import { deleteToken, authFalse } from "../store/actions/user";
import EditProfileComponent from './EditProfileComponent'
import BasketComponent from "./BasketComponent";
class MyRouter extends Component {
    render(){
        return(
        <Router id="myNav">
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
            <Route
              path="/productCard2"
            >
              {this.props.auth === false || undefined ? <Redirect to="/sign-in"/> : <ProductCardComponet2/>}
            </Route>
            <Route path="/editProfil">
              {this.props.auth === false || undefined ? (<Redirect to="/sign-in" />) : (<EditProfileComponent />)}
            </Route>
            <Route path="/basket">
            {this.props.auth === false || undefined ? (<Redirect to="/sign-in" />) : (<BasketComponent />)}
            </Route>
            <Route render={ () => this.props.auth === false || undefined ? <Redirect to="/"/> : <Redirect to="/Users-List"/> }/>
          </Switch>
        </Router>
        )
    }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  auth: state.userReducer.auth,
});

const mapDispatchToProps = {
  deleteToken,
  authFalse,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRouter);


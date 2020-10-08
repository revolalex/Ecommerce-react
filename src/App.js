import React, { Component } from "react";
import "./App.css";
import LoginComponent from "./Components/Login";
import SignupComponent from "./Components/Signup";
import AddingProductComponent from "./Components/AddingProductComponent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBarComponent from "./Components/NavBarComponent";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="myNav">
          <NavBarComponent />
        </div>
        <Switch>
          <Route path="/product">
            <AddingProductComponent />
          </Route>
          <Route path="/Sign-in">
            <LoginComponents />
          </Route>
          <Route path="/">
            <SignupComponents />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function SignupComponents() {
  return <SignupComponent />;
}

function LoginComponents() {
  return <LoginComponent />;
}

export default App;

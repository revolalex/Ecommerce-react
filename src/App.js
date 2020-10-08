import React, { Component } from 'react';
import "./App.css";
import {Route, Switch } from 'react-router-dom';

import NavBarComponent from "./Components/Login"
import LoginComponent from "./Components/Login";
import SignupComponent from "./Components/Signup";
import AddingProductComponent from "./Components/AddingProductComponent"

class App extends Component {
  render() {
    return (

      <main>
        {/* <NavBarComponent/> */}
        <Switch>
          <Route path="/" component={NavBarComponent} exact />
          <Route path="/signup" component={SignupComponent} exact />
          <Route path="/signin" component={LoginComponent} />
          <Route path="/product" component={AddingProductComponent} />
        </Switch>
      </main>
    );
  }
}

export default App;

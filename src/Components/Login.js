import React, { Component, component } from "react";
import './Login.css';

class LoginComponent extends Component {
  render() {
    return (
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required=""></input>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required=""></input>
            <label>Password</label>
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>
    );
  }
}
export default LoginComponent;
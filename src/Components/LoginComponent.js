import React, { Component } from "react";
import "./Login.css";

class LoginComponent extends Component {
  render() {
    return (
      <div>
        <div className="login-box">
          <h2>Sign-In</h2>
          <form>
            <div className="user-box">
              <input type="text" name="email" required=""></input>
              <label>Email</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" required=""></input>
              <label>Password</label>
            </div>
            <a href="t">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
          </form>
        </div>
      </div>
    );
  }
}
export default LoginComponent;

import React, { Component } from "react";
import "./Login.css";

class SignupComponent extends Component {
  render() {
    return (
      <div>
        <div class="box">
          <div class="wave -one"></div>
          <div class="wave -two"></div>
          <div class="wave -three"></div>
        </div>
        <div className="login-box">
          <h2>Sign up</h2>
          <form>
            <div className="user-box">
              <input type="text" name="" required=""></input>
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="email" name="" required=""></input>
              <label>email</label>
            </div>
            <div className="user-box">
              <input type="password" name="" required=""></input>
              <label>Password</label>
            </div>
            <a href="">
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
export default SignupComponent;

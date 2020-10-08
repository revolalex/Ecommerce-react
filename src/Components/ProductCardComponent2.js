import React, { Component } from "react";

import "./Card.css";

export default class ProductCardComponent2 extends Component {
  render() {
    return (
      <div >
        <div className="waveBox">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
        <div className="login-box">
          <h2>Nintendo Switch</h2>
          <img className="cardProductImg" src="https://images-na.ssl-images-amazon.com/images/I/71j3g0GW6EL._AC_SL1500_.jpg" alt=""/>
          <form>
            <div className="user-box">
              <input type="text" name="email" required=""></input>
              <label>Description</label>
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

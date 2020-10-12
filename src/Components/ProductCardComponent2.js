import React, { Component } from "react";

import "./productCard2.css";

export default class ProductCardComponent2 extends Component {
  render() {
    return (
      <div className="productDiv">
        <div className="login-box">
          <h2>Nintendo Switch</h2>
          <img
            className="cardProductImg"
            src="https://images-na.ssl-images-amazon.com/images/I/71j3g0GW6EL._AC_SL1500_.jpg"
            alt=""
          />
          <form>
            <div className="user-box">
              <h4>Description</h4>
              <p>Clablablabla valavkavkav vakav</p>
            </div>
            <div className="user-box">
              <h4>Category</h4>
              <p>Game</p>
            </div>
            <div className="user-box">
              <h4>Price</h4>
              <p>60€</p>
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

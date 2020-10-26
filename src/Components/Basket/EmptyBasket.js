import React, { Component } from "react";

class EmptyBasket extends Component {
  render() {
    return (
      <div className="container2">
        <h1>
          <div className="animation">
            <span className="first">Cart </span>
            <span className="oh">
              <span className="second">&nbsp;is empty</span>
            </span>
          </div>
        </h1>
      </div>
    );
  }
}

export default EmptyBasket;

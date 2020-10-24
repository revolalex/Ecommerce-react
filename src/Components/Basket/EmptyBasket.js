import React, { Component } from "react";

class EmptyBasket extends Component {
  render() {
    return (
      <div class="container2">
        <h1>
          <div class="animation">
            <span class="first">Cart </span>
            <span class="oh">
              <span class="second">&nbsp;is empty</span>
            </span>
          </div>
        </h1>
      </div>
    );
  }
}

export default EmptyBasket;

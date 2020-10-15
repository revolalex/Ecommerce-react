import React, { Component } from "react";
import "./CartComponent.css";
import { connect } from "react-redux";

class CartComponent extends Component {
  render() {
    return (
      <a className="cartA" href="https://www.google.fr/">
        <img
          className="cartImg"
          src="https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532331jylag.png"
          alt=""
        />
        {this.props.counter}
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.cartReducer.counter,
});

export default connect(mapStateToProps)(CartComponent);

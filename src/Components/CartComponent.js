import React, { Component } from "react";
import "./CartComponent.css";
import { connect } from "react-redux";

class CartComponent extends Component {
  render() {
    return (
      <a className="cartA" href="/basket">
        {" "}
        {this.props.productBasket.length}
        <img
          className="cartImg"
          src="https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532331jylag.png"
          alt="cart"
        />
        total: {this.props.total} $
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.cartReducer.counter,
  productBasket: state.cartReducer.productBasket,
  total: state.cartReducer.total,
});

export default connect(mapStateToProps)(CartComponent);
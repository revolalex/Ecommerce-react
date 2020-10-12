import React, { Component } from "react";
import axios from "axios";

import "./productCard2.css";

export default class ProductCardComponent2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      product: [],
    };
  }
  componentDidMount() {
    let id = localStorage.getItem("productIdClick");
    console.log("ID",id);
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((result) => {
        console.log(result);
        this.setState({
          product: result.data,
        });
        console.log(this.state.product);
        // localStorage.setItem("product", JSON.stringify(this.state.data));
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }

  render() {
    return (
      <div className="myRow">
        {this.state.product.map((product) => this.renderProduct(product))}
      </div>
    );
  }

  renderProduct(product) {
    return (
      // <div className="productDiv" key={product.id}>
        <div className="login-box">
          <h2>{product.name}</h2>
          <img className="cardProductImg" src={product.url} alt="" />
          <form>
            <div className="user-box">
              <h4>Description:</h4>
              <p>{product.description}</p>
            </div>
            <div className="user-box">
              <h4>Category</h4>
              <p>{product.category}</p>
            </div>
            <div className="user-box">
              <h4>Price</h4>
              <p>{product.prices}$</p>
              <p>Sell by: {product.username}</p>
            </div>
            <a href="t">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Buy
            </a>
          </form>
        </div>
      // </div>
    );
  }
}


import React, { Component } from "react";
import axios from "axios";
import "./productCard2.css";
import { connect } from "react-redux";
import {setProductClick} from '../store/actions/product'

class ProductCardComponent2 extends Component {

  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/${this.props.id}`)
      .then((result) => {
        this.props.setProductClick(result.data)
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }

  render() {
    return (
      <div className="myRow2">
        {this.renderProduct(this.props.product[0])}
      </div>
    );
  }

  renderProduct(product) {
    return (
        <div className="login-box2" key={product.id}>
          <h2>{product.name}</h2>
          <img className="cardProductImg2" src={product.url} alt="" />
          <form>
            <div className="user-box2">
              <h4>Description:</h4>
              <p>{product.description}</p>
            </div>
            <div className="user-box2">
              <h4>Category</h4>
              <p>{product.category}</p>
            </div>
            <div className="user-box2">
              <h4>Price</h4>
              <p>{product.prices}$</p>
              <h4>Seller</h4>
              <p>{product.username}</p>
            </div>
            <a href="/#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Buy {product.prices} $
            </a>
          </form>
        </div>
    );
  }
}

const mapDispatchToProps = {
  setProductClick
}

const mapStateToProps = (state) => ({
  product: state.productReducer.product,
  id: state.productReducer.id
})

export default connect(mapStateToProps,mapDispatchToProps) (ProductCardComponent2)
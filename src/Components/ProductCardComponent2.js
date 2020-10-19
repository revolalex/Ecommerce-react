import React, { Component } from "react";
import axios from "axios";
import "../Styles/productCard2.css";
import { connect } from "react-redux";
import { setProductClick } from "../store/actions/product";
import { addProductToCart } from "../store/actions/cart";
import ButtonComponent from "./ButtonComponent";
import { Card, Row, Col } from "react-bootstrap";

class ProductCardComponent2 extends Component {
  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/${this.props.id}`)
      .then((result) => {
        this.props.setProductClick(result.data);
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }
  addButtonIsClick(e) {
    let poductAdded = this.props.product[0].name
    e.preventDefault();
    this.props.addProductToCart(this.props.product[0]);
    alert(`${poductAdded}, has been added to your basket`)
  }

  render() {
    return (
      <div className="myRow2" key={this.props.product[0].name}>
        {this.renderProduct(this.props.product[0])}
      </div>
    );
  }

  renderProduct(product) {
    return (
      <div>
        <div className="login-box2 smallScreen">
          <h2>{product.name}</h2>
          <img className="cardProductImg2" src={product.url} alt="product" />
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
            <ButtonComponent
              text={"Buy" + product.prices + "$"}
              click={this.addButtonIsClick.bind(this)}
            />
          </form>
        </div>

        <div className="bigScreen">
          <Card className="mb-3 login-box2">
            <Row className="no-gutters">
              <Col className="md-4">
                <Card.Img className="cardImgProduct" src={product.url} />
              </Col>
              <Col className="md-8">
                <Card.Body>
                  <Card.Title className="titleCard">
                    <h2>{product.name}</h2>
                  </Card.Title>
                  <Card.Body className="subTitleCard">
                    <h4 >Description:</h4>
                    <p>{product.description}</p>
                    <h4>Category:</h4>
                    <p>{product.category}</p>
                    <h4 >Price:</h4>
                    <p>{product.prices}</p>
                    <h4 >Seller:</h4>
                    <p>{product.username}</p>
                  </Card.Body>
                  <ButtonComponent
                    text={"Buy" + product.prices + "$"}
                    click={this.addButtonIsClick.bind(this)}
                    className="downButton"
                  />
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>


        
      </div>
    );
  }
}

const mapDispatchToProps = {
  setProductClick,
  addProductToCart,
};

const mapStateToProps = (state) => ({
  counter: state.cartReducer.counter,
  product: state.productReducer.product,
  id: state.productReducer.id,
  productBasket: state.cartReducer.productBasket,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCardComponent2);


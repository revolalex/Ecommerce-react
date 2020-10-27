import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
// import "../../Styles/ListOfProduct.css";
import {
  setHistoryOrders,
  resetHistoryOrders,
} from "../../store/actions/orders";
import { connect } from "react-redux";
import TitleComponent from "../Small/TitleComponent";

class OrderComponent extends Component {
  componentDidMount() {
    axios
      .get(`http://localhost:8080/basketHistory/${this.props.id}`)
      .then((result) => {
        console.log("ICI", result.data);
        this.props.setHistoryOrders(result.data);
        console.log(this.props.old_Orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ButtonIsClick() {
    this.props.resetHistoryOrders();
  }

  renderProduct(product, index) {
    console.log(product);
    return (
      <div className="login-box-Edit" key={index}>
        <Row className="changeUrlP">
          <Col sm={2}>
            <img
              className="basketImg2"
              src={product.url}
              alt={product.name}
            ></img>
          </Col>
          <Col sm={5}>
            <Card.Body>
              <Card.Title>Order number: {product.id}</Card.Title>
              <Card.Text>
                <p className="productNameTitle">Category:</p>
                {product.category}
              </Card.Text>
              <Card.Text>
                <p className="productNameTitle">Name:</p>
                {product.name}
              </Card.Text>
            </Card.Body>
          </Col>
          <Col sm={5}>
            <Card.Body>
              <Card.Text>
                <p className="productNameTitle">Price:</p>
                {product.prices} $
              </Card.Text>
              <Card.Text>
                <p className="productNameTitle">Description:</p>
                {product.description}
              </Card.Text>
              <Card.Text>
              <p className="productNameTitle"> Qty:</p>
              {product.quantity}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    let a = "You have";
    let b = "never ordered";
    if (this.props.old_Orders.length > 1) {
      return (
        <div>
          <TitleComponent text1="Orders" text2="&nbsp;History" />
          {/* <h1 className="pageTitle">Orders History</h1> */}
          {this.props.old_Orders.map((product, index) =>
            this.renderProduct(product, index)
          )}
        </div>
      );
    } else {
      return (
        <div>
          <div class="container2">
            <h1>
              <div class="animation">
                <span class="first">{a}</span>
                <span class="oh">
                  <span class="second">&nbsp;{b}</span>
                </span>
              </div>
            </h1>
          </div>
        </div>
      );
    }
  }
}
const mapDispatchToProps = {
  setHistoryOrders,
  resetHistoryOrders,
};

const mapStateToProps = (state) => ({
  old_Orders: state.ordersReducer.old_Orders,
  id: state.userReducer.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent);

import React, { Component } from "react";
import { Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import "./OrderComponent.css";
import "../../Styles/ListOfProduct.css";
import { setHistoryOrders, resetHistoryOrders } from "../../store/actions/orders";
import { connect } from "react-redux";

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
              <Card.Title >
                Order number: {product.id}
              </Card.Title>
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
            </Card.Body>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.old_Orders.map((product, index) =>
          this.renderProduct(product, index)
        )}
      </div>
    );
  }
}
const mapDispatchToProps = {
  setHistoryOrders,
  resetHistoryOrders,
};

const mapStateToProps = (state) => ({
  old_Orders: state.ordersReducer.old_Orders,
  id: state.userReducer.id
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent);

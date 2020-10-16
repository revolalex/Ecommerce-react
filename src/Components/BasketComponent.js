import React, { Component } from "react";
import { increaseCounter, decreaseCounter, deleteProductFromCart } from "../store/actions/cart";
import { connect } from "react-redux";
import "./BasketComponent.css";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";

class BasketComponent extends Component {
  addClick(e) {
    e.preventDefault();
    this.props.increaseCounter();
  }
  decrementClick(e) {
    e.preventDefault();
    this.props.decreaseCounter();
  }
  deleteClick(e){
    e.preventDefault();
    this.props.deleteProductFromCart(this.props.productBasket)
    console.log("ICI",this.props.productBasket);

  }

  renderProduct(product) {
    return (
      <Container className="basketCard">
        <Row>
          <Col md={4}>
            <img
              className="basketImg"
              src={product.url}
              alt={product.name}
            ></img>
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="textCard">{product.name}</Card.Title>
              <ListGroup horizontal>
                <ListGroup.Item variant="info">
                  <Card.Text>Qté: {this.props.counter}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  Price : {product.prices}$
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  Total : {this.props.counter * 50}
                </ListGroup.Item>
              </ListGroup>
              <Form inline>
                <Button variant="info" onClick={this.addClick.bind(this)}>
                  +1
                </Button>
                <Button
                  variant="warning"
                  onClick={this.decrementClick.bind(this)}
                >
                  -1
                </Button>
                <Button variant="danger">
                  <img
                    className="trashBasket"
                    src="https://img.icons8.com/carbon-copy/100/000000/trash.png"
                    alt="trash"
                    onClick={this.deleteClick.bind(this)}
                  />
                </Button>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <div >
        {this.props.productBasket.map((product) => this.renderProduct(product))}
      </div>

    );
  }
}

const mapDispatchToProps = {
  increaseCounter,
  decreaseCounter,
  deleteProductFromCart
};

const mapStateToProps = (state) => ({
  counter: state.cartReducer.counter,
  productBasket: state.cartReducer.productBasket,
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketComponent);

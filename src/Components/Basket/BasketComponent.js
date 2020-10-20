import React, { Component } from "react";
import {
  deleteProductFromCart,
  increaseCounter,
  decreaseCounter
} from "../../store/actions/cart";
import { connect } from "react-redux";
import "../../Styles/BasketComponent.css";
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
  deleteClick(index) {
    this.props.deleteProductFromCart(this.props.productBasket[index]);
    alert(
      `${this.props.productBasket[index].name} has been deleted from your basket`
    );
  }
  increase(product) {
    this.props.increaseCounter(product);
  }
  decrease(product) {
    this.props.decreaseCounter(product);
  }

  renderProduct(product, index) {
    return (
      <Container className="basketCard" key={index}>
        <Row>
          <Col md={2}>
            <img
              className="basketImg"
              src={product.url}
              alt={product.name}
            ></img>
          </Col>
          <Col md={10}>
            <Card.Body>
              <Card.Title className="textCard">{product.name}</Card.Title>
              <ListGroup horizontal>
                <ListGroup.Item variant="info">
                  <Card.Text>Qté: {product.quantity}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                  Price : {product.prices}$
                </ListGroup.Item>
                <ListGroup.Item variant="info">
                Total : {product.prices * product.quantity}$
                </ListGroup.Item>
              </ListGroup>
              <Form inline>
                <Button
                  variant="info"
                  onClick={this.increase.bind(this, product)}
                >
                  +1
                </Button>
                <Button
                  variant="warning"
                  onClick={this.decrease.bind(this, product)}
                >
                  -1
                </Button>
                <Button variant="danger">
                  <img
                    className="trashBasket"
                    src="https://img.icons8.com/carbon-copy/100/000000/trash.png"
                    alt="trash"
                    onClick={this.deleteClick.bind(this, index)}
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
    console.log(this.props);
    if (this.props.productBasket) {
      return (
        <div>
          {this.props.productBasket.map((product, index) =>
            this.renderProduct(product, index)
          )}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapDispatchToProps = {
  deleteProductFromCart,
  increaseCounter,
  decreaseCounter,
};

const mapStateToProps = (state) => ({
  productBasket: state.cartReducer.productBasket,
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketComponent);

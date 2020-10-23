import React, { Component } from "react";
import { deleteProductFromCart, increaseCounter, decreaseCounter } from "../../store/actions/cart";
import { connect } from "react-redux";
import "./BasketComponent.css";
import Axios from "axios"
import Buttton from '../Others/button'
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";
import TitleComponent from '../Others/TitleComponent'
class BasketComponent extends Component {
  deleteClick(index) {
    this.props.deleteProductFromCart(this.props.productBasket[index]);
    alert(`${this.props.productBasket[index].name} has been deleted from your basket`)
  }

  increase(product){
    this.props.increaseCounter(product)
  }
  decrease(product){
    this.props.decreaseCounter(product)
  }
  storeBasket(e){
    e.preventDefault()
    Axios.post("http://localhost:8080/panier",this.props.productBasket)
  }
  renderProduct(product, index) {
    return (
      <Container className="basketCard" key={index}>
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
                <Button variant="info" onClick={this.increase.bind(this,product)}>+1</Button>
                <Button variant="warning" onClick={this.decrease.bind(this,product)}>-1</Button>
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
    if (this.props.productBasket.length !== 0) {
      return (
        <div>
          <TitleComponent text1="Cart" text2="&nbsp;Detail"/>

          {this.props.productBasket.map((product, index) =>
            this.renderProduct(product, index)
          )}
          <Buttton
            text="Valider le panier"
            link="/paiement"
            click={this.storeBasket.bind(this)}
          />
        </div>
      );
    } else {
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
}

const mapDispatchToProps = {
  deleteProductFromCart,
  increaseCounter,
  decreaseCounter
};

const mapStateToProps = (state) => ({
  productBasket: state.cartReducer.productBasket,
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketComponent);
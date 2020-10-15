import React, { Component } from "react";
import { increaseCounter, decreaseCounter } from "../store/actions/cart";
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
  decrementClick(e){
    e.preventDefault();
    this.props.decreaseCounter();
  }
  render() {
    return (
      <Container className="basketCard">
        <Row>
          <Col md={4}>
            <img
              className="basketImg"
              src="https://images-na.ssl-images-amazon.com/images/I/81QixbutCXL._AC_SL1500_.jpg"
              alt="mario"
            ></img>
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="textCard">Mario Bros</Card.Title>
              <Card.Text>
                <ListGroup horizontal>
                  <ListGroup.Item variant="info">
                    Qté: {this.props.counter}
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">Price : 50$</ListGroup.Item>
                  <ListGroup.Item variant="info">Total : {this.props.counter * 50}</ListGroup.Item>
                </ListGroup>
              </Card.Text>
              <Form inline>
                <Button variant="info" onClick={this.addClick.bind(this)}>
                  +1
                </Button>
                <Button variant="warning" onClick={this.decrementClick.bind(this)}>-1</Button>
                <Button variant="danger">
                  <img
                    className="trashBasket"
                    src="https://img.icons8.com/carbon-copy/100/000000/trash.png"
                    alt="trash"
                  />
                </Button>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  increaseCounter,
  decreaseCounter,
};

const mapStateToProps = (state) => ({
  counter: state.cartReducer.counter,
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketComponent);

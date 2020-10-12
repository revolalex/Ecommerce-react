import React, { Component } from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";

import axios from "axios";
import "./ListOfProduct.css";

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/`)
      .then((result) => {
        this.setState({
          data: result.data,
        });
        console.log("STATE DATA", this.state.data);
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <div id="myRow">
        <Container className="testContainer">
          <Row className="justify-content-md-center">
            {this.state.data.map((product) => this.renderProduct(product))}
          </Row>
        </Container>
      </div>
    );
  }

  renderProduct(product, index) {
    return (
      <Col className="testCol" md="auto">
        <Card
          className="box"
          border="info"
          bg="dark"
          text="light"
          style={{ width: "18rem" }}
          key={index}
        >
          <Card.Header>{product.category}</Card.Header>
          <Card.Img className="testImg" variant="top" src={product.url} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Button variant="info">Add to Cart</Button>
          </Card.Body>
          <Card.Footer text="light">{product.prices} €</Card.Footer>
        </Card>
      </Col>
    );
  }
}

export default ProductListPage;

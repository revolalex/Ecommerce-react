import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { setProducts } from "../store/action/products";
import axios from "axios";
import "./ListOfProduct.css";

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/reducer/product";

class ProductListPage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.add = this.add.bind(this);
  }

  add = (data) => {
    setProducts(data);
  };

  componentDidMount() {
    const store = configureStore({ reducer: productReducer });
    axios
      .get(`http://localhost:8080/products/`)
      .then((result) => {
        this.setState({
          data: result.data,
        });
        // this.props.setProducts(result.data)
        this.add(result.data);
        // store.dispatch({setProducts})

        // localStorage.setItem("product", JSON.stringify(this.state.data));
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }

  render() {
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

  renderProduct(product) {
    return (
      <Col className="testCol" md="auto" key={product.id}>
        <Card
          className="box"
          border="info"
          bg="dark"
          text="light"
          style={{ width: "18rem" }}
        >
          <Card.Header>{product.category}</Card.Header>
          <Card.Img className="testImg" variant="top" src={product.url} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <a
              href="/productCard2"
              onClick={() => {
                localStorage.setItem(
                  "productIdClick",
                  JSON.stringify(product.id)
                );
              }}
            >
              More Info
            </a>
            {/* <Button variant="info">Add to Cart</Button> */}
          </Card.Body>
          <Card.Footer text="light">{product.prices} €</Card.Footer>
        </Card>
      </Col>
    );
  }
}

export default ProductListPage;

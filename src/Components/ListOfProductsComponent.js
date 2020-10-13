import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { setProducts } from "../store/action/products";
import axios from "axios";
import { connect } from "react-redux";
import "./ListOfProduct.css";

class ProductListPage extends Component {
  constructor() {
    super();
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
        this.props.setProducts(result.data);
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

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
});

const mapDispatchToProps = {
  setProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

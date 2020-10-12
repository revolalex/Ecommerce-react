import React, { Component } from "react";
import { CardColumns, Card, Button } from "react-bootstrap";
import "./ProductList.css";
import axios from "axios";

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
      <div id="myRow" className="row">
        <CardColumns id="myColums">
          {this.state.data.map((product) => this.renderProduct(product))}
        </CardColumns>
      </div>
    );
  }

  renderProduct(product) {
    return (
      <Card
        id="myCard"
        className="text-center"
        border="info"
        bg="dark"
        text="light"
        style={{ width: "18rem" }}
      >
        <Card.Header>{product.category}</Card.Header>
        <Card.Img variant="top" src={product.url} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="info">Add to Cart</Button>
        </Card.Body>
        <Card.Footer text="light">{product.prices} €</Card.Footer>
      </Card>
    );
  }
}

export default ProductListPage;

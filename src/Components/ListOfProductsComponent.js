import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import axios from "axios";
import "./ListOfProduct.css";

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.productClick = this.productClick.bind(this)
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/`)
      .then((result) => {
        this.setState({
          data: result.data,
        });
        // localStorage.setItem("product", JSON.stringify(this.state.data));
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }
  productClick(id){
    console.log("IDCLICK",id)
    localStorage.setItem("productIdClick", JSON.stringify(id));
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
            <a href="/productCard2" onClick={()=>{localStorage.setItem("productIdClick", JSON.stringify(product.id))}}>More Info</a>
            {/* <Button variant="info">Add to Cart</Button> */}
          </Card.Body>
          <Card.Footer text="light">{product.prices} €</Card.Footer>
        </Card>
      </Col>
    );
  }
}

export default ProductListPage;

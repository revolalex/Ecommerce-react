import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {setProducts,setIdProduct} from '../../store/actions/product.js'
import axios from "axios";
import "./ListOfProduct.css";
import {connect} from 'react-redux'
class ProductListPage extends Component {
  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/`)
      .then((result) => {
        this.props.setProducts(result.data)
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }
  productClick(id){
    this.props.setIdProduct(id)
  }

  render() {
    return (
      <div id="myRow">
        <Container className="testContainer">
          <Row className="justify-content-md-center">
            {this.props.products.map((product) => this.renderProduct(product))}
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
            <a href="/productCard2" onClick={this.productClick.bind(this,product.id)}>More Info</a>
          </Card.Body>
          <Card.Footer text="light">{product.prices} €</Card.Footer>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  idProduct: state.productReducer.id
})

const mapDispatchToProps = {
  setProducts,
  setIdProduct
}

export default connect(mapStateToProps,mapDispatchToProps) (ProductListPage);

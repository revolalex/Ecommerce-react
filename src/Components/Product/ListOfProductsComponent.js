import React, { Component } from "react";
import { Card, Col, Container, Row, NavDropdown } from "react-bootstrap";
import {
  setListOfProducts,
  setIdProduct,
} from "../../store/actions/product.js";
import axios from "axios";
import "../../Styles/ListOfProduct.css";
import TitleComponent from "../Small/TitleComponent";
import { connect } from "react-redux";
import { categoryToShow } from "../../store/actions/category";
class ProductListPage extends Component {
  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/`)
      .then((result) => {
        this.props.setListOfProducts(result.data);
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }
  productClick(id) {
    this.props.setIdProduct(id);
    console.log(this.props.products.id);
  }
  categorySet(e) {
    console.log(e);
    localStorage.setItem("categoryToShow", e);
    this.props.categoryToShow(e);
  }

  render() {
    let product = this.props.products;
    let test = [];
    product.forEach((element) => {
      if (element.category) {
        if (!test.includes(element.category)) {
          test.push(element.category);
        }
      }
    });
    console.log(test);
    return (
      <div id="myRow">
        <NavDropdown
          title="Category"
          id="nav-dropdown"
          onSelect={this.categorySet.bind(this)}
        >
          {test.map((product) => this.renderCategory(product))}
        </NavDropdown>

        <TitleComponent text1="Products" text2="&nbsp;list" />

        <Container className="testContainer">
          <Row className="justify-content-md-center">
            {this.props.products.map((product) => this.renderProduct(product))}
          </Row>
        </Container>
      </div>
    );
  }

  renderCategory(category) {
    return (
      <div key={category}>
        <NavDropdown.Item eventKey={category}>{category}</NavDropdown.Item>
      </div>
    );
  }

  renderProduct(product) {
    if (product.category === `${this.props.category}`) {
      return (
        <Col className="testCol" md="auto" key={product.id}>
          <Card
            className="box"
            border="info"
            bg="dark"
            text="light"
            style={{ width: "18rem" }}
          >
            <Card.Header className="text-center">
              {product.category}
            </Card.Header>
            <Card.Img className="testImg" variant="top" src={product.url} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <a
                href="/productCard2"
                onClick={this.productClick.bind(this, product.id)}
              >
                More Info
              </a>
            </Card.Body>
            <Card.Footer id="footerCard" text="light">
              {product.prices} €
            </Card.Footer>
          </Card>
        </Col>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  idProduct: state.productReducer.id,
  category: state.categoryReducer.category,
});

const mapDispatchToProps = {
  setListOfProducts,
  setIdProduct,
  categoryToShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

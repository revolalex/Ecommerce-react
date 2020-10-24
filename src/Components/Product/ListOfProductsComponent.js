import React, { Component } from "react";
import { Card, Col, Container, Row, NavDropdown } from "react-bootstrap";
import {
  setListOfProducts,
  setIdProduct,
} from "../../store/actions/product.js";
import axios from "axios";
import "../../Styles/ListOfProduct.css";
// import TitleComponent from "../Small/TitleComponent";
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
  }
  categorySet(e) {
    this.props.categoryToShow(e);
  }

  render() {
    //store in navCategory all the different category of products
    let product = this.props.products;
    let navCategory = [];
    product.forEach((element) => {
      if (element.category) {
        // if array not contains this category add it
        if (!navCategory.includes(element.category)) {
          navCategory.push(element.category);
        }
      }
    });
    let navCategorySort = navCategory.sort();

    let testSale = false;
    product.forEach((element) => {
      if (element.promotionIsActive === 1) {
        testSale = true;
      }
    });

    let navSale;
    if (testSale === true) {
      navSale = <NavDropdown.Item eventKey="Sales">Sales</NavDropdown.Item>;
    }

    return (
      <div id="myRow">
        {/* <TitleComponent text1="Product" text2="&nbsp;list" /> */}
        <div>
          <NavDropdown
            title="Category"
            id="nav-dropdown"
            onSelect={this.categorySet.bind(this)}
          >
            <NavDropdown.Item eventKey="All">All</NavDropdown.Item>
            {navSale}
            {navCategorySort.map((product) => this.renderCategory(product))}
          </NavDropdown>
        </div>
        <Container className="testContainer">
          <Row className="justify-content-md-center">
            {this.props.products.map((product) => this.renderProduct(product))}
          </Row>
        </Container>
      </div>
    );
  }

  //use to show all the different category of products in NavDrop
  renderCategory(category) {
    return (
      <div key={category}>
        <NavDropdown.Item eventKey={category}>{category}</NavDropdown.Item>
      </div>
    );
  }

  renderProduct(product) {
    let salelogo
    if (product.promotionIsActive === 1){
      salelogo = <img id="saleImg" src="https://www.icone-png.com/png/44/44044.png" alt="sale"></img>
    }
    if (
      product.category === `${this.props.category}` ||
      this.props.category === "All"
    ) {
      return (
        <Col className="testCol" md="auto" key={product.id}>
          <Card
            className="box"
            border="info"
            bg="dark"
            text="light"
            style={{ width: "18rem" }}
          >
            <Card.Header className="text-center titleCardList">
              {product.category}
            </Card.Header>
            <Card.Img className="testImg" variant="top" src={product.url} />
            {salelogo}
            <Card.Body>
              <Card.Title className="titleCardList">{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <a
                href="/productCard2"
                onClick={this.productClick.bind(this, product.id)}
              >
                More Info
              </a>
            </Card.Body>
            <Card.Footer
              className={
                product.promotionIsActive === 1 ? "colorSalePrice" : ""
              }
              id="footerCard"
              text="light"
            >
              {product.promotionIsActive === 1
                ? product.promotion
                : product.prices}{" "}
              €
            </Card.Footer>
          </Card>
        </Col>
      );
    }

    // SHOW ONLY PRODUCT IN PROMOTION
    if (product.promotionIsActive === 1 && this.props.category === "Sales") {
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
            <img id="saleImg" src="https://www.icone-png.com/png/44/44044.png" alt="sale"></img>
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
            <Card.Footer
              className={
                product.promotionIsActive === 1 ? "colorSalePrice" : ""
              }
              id="footerCard"
              text="light"
            >
              {product.promotionIsActive === 1
                ? product.promotion
                : product.prices}{" "}
              €
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

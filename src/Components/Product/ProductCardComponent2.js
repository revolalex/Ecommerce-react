import React, { Component } from "react";
import axios from "axios";
import "../../Styles/productCard2.css";
import { connect } from "react-redux";
import { setProduct } from "../../store/actions/product";
import { addProductToCart } from "../../store/actions/cart";
import ButtonComponent from "../Small/ButtonComponent";
import { Card, Row, Col, Badge } from "react-bootstrap";

class ProductCardComponent2 extends Component {
  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/${this.props.id}`)
      .then((result) => {
        console.log(result);
        result.data[0].id_user_affiliate = this.props.idUser
        this.props.setProduct(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addButtonIsClick(e) {
    let poductAdded = this.props.product[0].name
    e.preventDefault();
    this.props.addProductToCart(this.props.product[0]);
    alert(`${poductAdded}, has been added to your basket`)
  }

  render() {
    return (
      <div className="myRow2" key={this.props.product[0].name}>
        {this.renderProduct(this.props.product[0])}
      </div>
    );
  }
  renderPromo(product){
    if(product.promotionIsActive){
    return(
    <div>
      <h5><Badge id="promotion" variant="danger"> {product.prices} $</Badge></h5>
      <p>{product.promotion} $</p>
    </div>
    )} else {
      return(
        <div>
          <p>{product.prices} $</p>
        </div>
      )
    }
  }
  
  renderProduct(product) {
    let reducPrice = `${product.promotion} $`
    return (
      <div>
        {/* SMALL SCREEN */}{/* SMALL SCREEN */}{/* SMALL SCREEN */}
        {/* SMALL SCREEN */}{/* SMALL SCREEN */}{/* SMALL SCREEN */}
        <div className="login-box2 smallScreen">
          <h2>{product.name}</h2>
          <img className="cardProductImg2" src={product.url} alt="product" />
          <form>
            <div className="user-box2">
              <h4>Description:</h4>
              <p>{product.description}</p>
            </div>
            <div className="user-box2">
              <h4>Category</h4>
              <p>{product.category}</p>
            </div>
            <div className="user-box2">
              <h4>Price</h4>
              {this.renderPromo(product)}
              <h4>Seller</h4>
              <p>{product.lastName} {product.firstName}</p>
            </div>
            <ButtonComponent
              text={"Buy" + product.prices + " $"}
              click={this.addButtonIsClick.bind(this)}
            />
          </form>
        </div>
        {/* BIG SCREEN */}{/* BIG SCREEN */}{/* BIG SCREEN */}{/* BIG SCREEN */}
        {/* BIG SCREEN */}{/* BIG SCREEN */}{/* BIG SCREEN */}{/* BIG SCREEN */}
        <div className="bigScreen">
          <Card className="mb-3 login-box2">
            <Row className="no-gutters">
              <Col className="md-4">
                <Card.Img className="cardImgProduct" src={product.url} />
              </Col>
              <Col className="md-8">
                <Card.Body>
                  <Card.Title className="titleCard">
                    <h2>{product.name}</h2>
                  </Card.Title>
                  <Card.Body className="subTitleCard">
                    <h4 >Description:</h4>
                    <p>{product.description}</p>
                    <h4>Category:</h4>
                    <p>{product.category}</p>
                    <h4 >Price:</h4>
                    {this.renderPromo(product)}
                    <h4 >Seller:</h4>
                    <p>{product.lastName} {product.firstName}</p>
                  </Card.Body>
                  <ButtonComponent
                    text={product.promotionIsActive === 1 ? reducPrice: product.prices} 
                    click={this.addButtonIsClick.bind(this)}
                    className="downButton"
                  />
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>


        
      </div>
    );
  }
}

const mapDispatchToProps = {
  setProduct,
  addProductToCart,
};

const mapStateToProps = (state) => ({
  counter: state.cartReducer.counter,
  product: state.productReducer.product,
  id: state.productReducer.id,
  idUser: state.userReducer.id,
  productBasket: state.cartReducer.productBasket,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCardComponent2);

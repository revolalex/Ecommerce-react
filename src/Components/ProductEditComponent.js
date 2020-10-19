import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";

import "../Styles/ProductEditComponent.css";
import axios from "axios";

class ProductEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOfThisUser: [],
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:8080/productid/${this.props.id}`)
      .then((result) => {
        console.log("DATA", result.data);
        this.setState({
          productOfThisUser: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderProduct(product, index) {
    return (
      <Container className="basketCard2" key={index}>


          
        <Row>
          <Col md={2}>
            <img
              className="basketImg2"
              src={product.url}
              alt={product.name}
            ></img>
          </Col>
          <Col md={10}>
            <Card.Body>
              <Card.Title className="textCard2">{product.name}</Card.Title>
              <Form inline>
                <Button variant="info">Edit</Button>
                <Button variant="danger">
                  Delete
                  <img
                    className="trashBasket2"
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

  render() {
    return (
      <div>
        {this.state.productOfThisUser.map((product, index) =>
          this.renderProduct(product, index)
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.userReducer.id,
});
export default connect(mapStateToProps)(ProductEditComponent);

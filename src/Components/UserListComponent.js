import React, { Component } from "react";
import { Card, Button, Col , Row, Container} from "react-bootstrap";
import "./ProductCard.css";
import axios from 'axios';

export default class ProductCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/allUsers/`)
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
          {this.state.data.map((user) => this.renderProduct(user))}
        </Row>
      </Container>
      </div>
    );
  }

  renderProduct(user, index) {
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
          <Card.Header>{user.firstName} {user.lastName}</Card.Header>
          <Card.Img className="testImg" variant="top" src={user.url} />
          <Card.Body>
            <Card.Title>Email: {user.email}</Card.Title>
            <Card.Text>{user.description}</Card.Text>
         
          </Card.Body>
          <Card.Footer text="light">Id: {user.id}</Card.Footer>
        </Card>
      </Col>
    );
  }
}



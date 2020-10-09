import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./Card.css";

export default class ProductCardComponent extends Component {
  render() {
    return (
      <div >

        <Card 
          id="myCard"
          className="text-center"
          border="info"
          bg="dark"
          text="light"
          style={{ width: "18rem" }}
        >
          <Card.Header>Category</Card.Header>
          <Card.Img
            variant="top"
            src="https://images-na.ssl-images-amazon.com/images/I/71j3g0GW6EL._AC_SL1500_.jpg"
          />
          <Card.Body>
            <Card.Title>Nintendo Switch</Card.Title>
            <Card.Text>Nintendo Switch avec paire de Joy-Con Rouge Néon et Bleu Néon</Card.Text>
            <Button variant="info">Add to Cart</Button>
          </Card.Body>
          <Card.Footer text="light">290 $</Card.Footer>
        </Card>
      </div>
    );
  }
}

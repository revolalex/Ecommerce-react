import React, { Component } from "react";
import { CardColumns, Card } from "react-bootstrap";
import "./ProductCard.css";
import axios from "axios";

class UsersList extends Component {
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
      <CardColumns id="myColums">
        {this.state.data.map((users) => this.usersList(users))}
      </CardColumns>
    );
  }

  usersList(users) {
    return (
      <Card
        id="myCard"
        className="text-center"
        border="info"
        bg="dark"
        text="light"
        style={{ width: "18rem" }}
      >
        <Card.Header>{users.firstName} {users.lastName}</Card.Header>
        <Card.Img variant="top" src={users.url} />
        <Card.Body>
          <Card.Title>Email: {users.email}</Card.Title>
          <Card.Text>Id: {users.id}</Card.Text>
        </Card.Body>
        <Card.Footer text="light">First Name: {users.firstName}</Card.Footer>
      </Card>
    );
  }
}

export default UsersList;

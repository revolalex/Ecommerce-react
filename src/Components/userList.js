import React, { Component } from "react";
import { CardColumns, Card, Container, Col, Row } from "react-bootstrap";
import "./UserList.css";
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
    console.log("DATA", this.state.data);
    return (
      <Container>
        <Row>{this.state.data.map((users) => this.usersList(users))}</Row>
      </Container>
    );
  }

  usersList(users, index) {
    return (
      <Col xs={6} md={4}>
        <Card
          className="box"
          border="info"
          bg="dark"
          text="light"
          style={{ width: "18rem" }}
          key={users.id}
        >
          <Card.Header>
            {users.firstName} {users.lastName}
          </Card.Header>
          <Card.Img className="testImg" variant="top" src={users.url} />
          <Card.Body>
            <Card.Title>Email: {users.email}</Card.Title>
            <Card.Text>{users.description}</Card.Text>
          </Card.Body>
          <Card.Footer text="light">Id: {users.id}</Card.Footer>
        </Card>
      </Col>

      // <Card
      //   id="myCard"
      //   className="text-center"
      //   border="info"
      //   bg="dark"
      //   text="light"
      //   // style={{ width: "18rem" }}
      // >
      //   <Card.Header>{users.firstName} {users.lastName}</Card.Header>
      //   <Card.Img variant="top" src={users.url} />
      //   <Card.Body>
      //     <Card.Title>Email: {users.email}</Card.Title>
      //     <Card.Text>Id: {users.id}</Card.Text>
      //   </Card.Body>
      //   <Card.Footer text="light">First Name: {users.firstName}</Card.Footer>
      // </Card>
    );
  }
}

export default UsersList;

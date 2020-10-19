import React, { Component } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import "./UserList.css";
import axios from "axios";
import { setUsers } from "../store/actions/user";
import { connect } from "react-redux";

class ProductCardComponent extends Component {
  componentDidMount() {
    axios
      .get(`http://localhost:8080/allUsers/`)
      .then((result) => {
        this.props.setUsers(result.data);
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }

  renderProduct(user) {
    return (
      <Col className="testCol" md="auto" key={user.id}>
        <Card
          className="box"
          border="info"
          bg="dark"
          text="light"
          style={{ width: "18rem" }}
        >
          <Card.Header>
            {user.firstName} {user.lastName}
          </Card.Header>
          <Card.Img className="testImg" variant="top" src={user.url} />
          <Card.Body>
            <Card.Title>Email: {user.email}</Card.Title>
            <Card.Text>{user.firstName}</Card.Text>
          </Card.Body>
          <Card.Footer text="light">Id: {user.id}</Card.Footer>
        </Card>
      </Col>
    );
  }
  render() {
    return (
      <div id="myRow">
        <Container className="testContainer">
          <Row className="justify-content-md-center">
            {this.props.users.map((user) => this.renderProduct(user))}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
});
const mapDispatchToProps = {
  setUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCardComponent);

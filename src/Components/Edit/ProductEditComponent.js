import { Card, Col, Row, Form } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import "../../Styles/ProductEditComponent.css";
import axios from "axios";
import ButtonComponent from "../Small/ButtonComponent";
import {setIdProduct} from "../../store/actions/product"



import { withRouter } from "react-router-dom";

class ProductEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productOfThisUser: [],
      headerWithToken: {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      },
    };
  }
  async componentDidMount() {
    await axios
      .get(`http://localhost:8080/productid/${this.props.id}`)
      .then((result) => {
        console.log("PRODUCT THIS USER HAVE TO SELL", result.data);
        this.setState({
          productOfThisUser: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async deleteClick(id, e) {
    console.log(this.state.headerWithToken);
    e.preventDefault();
    try {
      await axios
        .post(
          `http://localhost:8080/product/${id}`,
          "",
          this.state.headerWithToken
        )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      await axios
        .get(`http://localhost:8080/productid/${this.props.id}`)
        .then((result) => {
          console.log("PRODUCT AFTER DELETE", result.data);
          this.setState({
            productOfThisUser: result.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

   editButtonClick(index, e) {
    localStorage.setItem('productIdToEdit', index);
    e.preventDefault();
    this.props.setIdProduct(index)
    this.props.history.push("/edit-product");
  }

  renderProduct(product, index) {
    return (
      <div className="login-box-Edit" key={product.id}>
        <Row className="changeUrlP">
          <Col sm={2}>
            <img
              className="basketImg2"
              src={product.url}
              alt={product.name}
            ></img>
          </Col>
          <Col sm={5}>
            <Card.Body>
              <Card.Title className="productNameTitle">
                {product.name}
              </Card.Title>
              <Card.Text>
                Category:
                <br />
                {product.category}
              </Card.Text>
            </Card.Body>
          </Col>
          <Col sm={5}>
            <Card.Body>
              <Card.Text className="productNameTitle">
                Price: {product.prices} $
              </Card.Text>
              <Form center="true">
                <ButtonComponent
                  text="Edit"
                  click={this.editButtonClick.bind(this, product.id)}
                  link="/edit-product"
                />
                <ButtonComponent
                  click={this.deleteClick.bind(this, product.id)}
                  class="myARed"
                  text={
                    <img
                      alt="svgImg"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzBmZWFlYSI+PHBhdGggZD0iTTgwLjYyNSw1LjM3NWMtMi42ODc1LDAgLTUuMTAyMDUsMS4zNDM3NSAtNi43MTg3NSwzLjQ5NTg1bC04LjA2MjUsMTIuNjI5MTVoLTMwLjkwNjI1Yy00LjU2NjY1LDAgLTguMDYyNSwzLjQ5NTg1IC04LjA2MjUsOC4wNjI1djE2LjEyNWMwLDQuNTY2NjUgMy40OTU4NSw4LjA2MjUgOC4wNjI1LDguMDYyNWgwLjI2MjQ1bDkuNDA2MjUsOTAuMDMxMjVjMC44MDgzNSw2Ljk5MTcgNi40NTYzLDEyLjA5Mzc1IDEzLjQzNzUsMTIuMDkzNzVoNjYuNjYyNmM2Ljk4MTIsMCAxMi42MjkxNSwtNS4xMDIwNSAxMy40Mzc1LC0xMi4wOTM3NWw5LjQwNjI1LC05MC4wMzEyNWgwLjI2MjQ1YzQuNTY2NjUsMCA4LjA2MjUsLTMuNDk1ODUgOC4wNjI1LC04LjA2MjV2LTE2LjEyNWMwLC00LjU2NjY1IC0zLjQ5NTg1LC04LjA2MjUgLTguMDYyNSwtOC4wNjI1aC0zMC45MDYyNWwtOC4zMjQ5NSwtMTIuNjI5MTVjLTEuMzQzNzUsLTIuMTUyMSAtNC4wMzEyNSwtMy40OTU4NSAtNi43MTg3NSwtMy40OTU4NXpNODAuODg3NDUsMTAuNzVoMjEuMjM3NTVjMC44MDgzNSwwIDEuNjE2NywwLjUzNTQgMi4xNTIxLDEuMDcwOGw2LjE3Mjg1LDkuNjc5MmgtMzguMTQ5OWw2LjE3Mjg1LC05LjY3OTJjMC41MzU0LC0wLjUzNTQgMS4zNDM3NSwtMS4wNzA4IDIuNDE0NTUsLTEuMDcwOHpNMzQuOTM3NSwyNi44NzVoMTEyLjg3NWMxLjYxNjcsMCAyLjY4NzUsMS4wNzA4IDIuNjg3NSwyLjY4NzV2MTYuMTI1YzAsMS42MTY3IC0xLjA3MDgsMi42ODc1IC0yLjY4NzUsMi42ODc1aC0xMTIuODc1Yy0xLjYxNjcsMCAtMi42ODc1LC0xLjA3MDggLTIuNjg3NSwtMi42ODc1di0xNi4xMjVjMCwtMS42MTY3IDEuMDcwOCwtMi42ODc1IDIuNjg3NSwtMi42ODc1ek00MywzMi4yNWMtMS42MTY3LDAgLTIuNjg3NSwxLjA3MDggLTIuNjg3NSwyLjY4NzV2NS4zNzVjMCwxLjYxNjcgMS4wNzA4LDIuNjg3NSAyLjY4NzUsMi42ODc1YzEuNjE2NywwIDIuNjg3NSwtMS4wNzA4IDIuNjg3NSwtMi42ODc1di01LjM3NWMwLC0xLjYxNjcgLTEuMDcwOCwtMi42ODc1IC0yLjY4NzUsLTIuNjg3NXpNNTYuNDM3NSwzMi4yNWMtMS42MTY3LDAgLTIuNjg3NSwxLjA3MDggLTIuNjg3NSwyLjY4NzV2NS4zNzVjMCwxLjYxNjcgMS4wNzA4LDIuNjg3NSAyLjY4NzUsMi42ODc1YzEuNjE2NywwIDIuNjg3NSwtMS4wNzA4IDIuNjg3NSwtMi42ODc1di01LjM3NWMwLC0xLjYxNjcgLTEuMDcwOCwtMi42ODc1IC0yLjY4NzUsLTIuNjg3NXpNNjkuODc1LDMyLjI1Yy0xLjYxNjcsMCAtMi42ODc1LDEuMDcwOCAtMi42ODc1LDIuNjg3NXY1LjM3NWMwLDEuNjE2NyAxLjA3MDgsMi42ODc1IDIuNjg3NSwyLjY4NzVjMS42MTY3LDAgMi42ODc1LC0xLjA3MDggMi42ODc1LC0yLjY4NzV2LTUuMzc1YzAsLTEuNjE2NyAtMS4wNzA4LC0yLjY4NzUgLTIuNjg3NSwtMi42ODc1ek04My4zMTI1LDMyLjI1Yy0xLjYxNjcsMCAtMi42ODc1LDEuMDcwOCAtMi42ODc1LDIuNjg3NXY1LjM3NWMwLDEuNjE2NyAxLjA3MDgsMi42ODc1IDIuNjg3NSwyLjY4NzVjMS42MTY3LDAgMi42ODc1LC0xLjA3MDggMi42ODc1LC0yLjY4NzV2LTUuMzc1YzAsLTEuNjE2NyAtMS4wNzA4LC0yLjY4NzUgLTIuNjg3NSwtMi42ODc1ek05OS40Mzc1LDMyLjI1Yy0xLjYxNjcsMCAtMi42ODc1LDEuMDcwOCAtMi42ODc1LDIuNjg3NXY1LjM3NWMwLDEuNjE2NyAxLjA3MDgsMi42ODc1IDIuNjg3NSwyLjY4NzVjMS42MTY3LDAgMi42ODc1LC0xLjA3MDggMi42ODc1LC0yLjY4NzV2LTUuMzc1YzAsLTEuNjE2NyAtMS4wNzA4LC0yLjY4NzUgLTIuNjg3NSwtMi42ODc1ek0xMTIuODc1LDMyLjI1Yy0xLjYxNjcsMCAtMi42ODc1LDEuMDcwOCAtMi42ODc1LDIuNjg3NXY1LjM3NWMwLDEuNjE2NyAxLjA3MDgsMi42ODc1IDIuNjg3NSwyLjY4NzVjMS42MTY3LDAgMi42ODc1LC0xLjA3MDggMi42ODc1LC0yLjY4NzV2LTUuMzc1YzAsLTEuNjE2NyAtMS4wNzA4LC0yLjY4NzUgLTIuNjg3NSwtMi42ODc1ek0xMjYuMzEyNSwzMi4yNWMtMS42MTY3LDAgLTIuNjg3NSwxLjA3MDggLTIuNjg3NSwyLjY4NzV2NS4zNzVjMCwxLjYxNjcgMS4wNzA4LDIuNjg3NSAyLjY4NzUsMi42ODc1YzEuNjE2NywwIDIuNjg3NSwtMS4wNzA4IDIuNjg3NSwtMi42ODc1di01LjM3NWMwLC0xLjYxNjcgLTEuMDcwOCwtMi42ODc1IC0yLjY4NzUsLTIuNjg3NXpNMTM5Ljc1LDMyLjI1Yy0xLjYxNjcsMCAtMi42ODc1LDEuMDcwOCAtMi42ODc1LDIuNjg3NXY1LjM3NWMwLDEuNjE2NyAxLjA3MDgsMi42ODc1IDIuNjg3NSwyLjY4NzVjMS42MTY3LDAgMi42ODc1LC0xLjA3MDggMi42ODc1LC0yLjY4NzV2LTUuMzc1YzAsLTEuNjE2NyAtMS4wNzA4LC0yLjY4NzUgLTIuNjg3NSwtMi42ODc1ek00MC41NzQ5NSw1My43NWgxMDEuNjAwMWwtOS40MDYyNSw4OS40OTU4NWMtMC41NDU5LDQuMDMxMjUgLTMuNzY4OCw3LjI1NDE1IC04LjA2MjUsNy4yNTQxNWgtNjYuNjYyNmMtNC4wMzEyNSwwIC03LjUxNjYsLTMuMjIyOSAtOC4wNjI1LC03LjI1NDE1ek05MS4zNzUsNjcuMTg3NWMtMS42MTY3LDAgLTIuNjg3NSwxLjA3MDggLTIuNjg3NSwyLjY4NzV2NTMuNzVjMCwxLjYxNjcgMS4wNzA4LDIuNjg3NSAyLjY4NzUsMi42ODc1YzEuNjE2NywwIDIuNjg3NSwtMS4wNzA4IDIuNjg3NSwtMi42ODc1di01My43NWMwLC0xLjYxNjcgLTEuMDcwOCwtMi42ODc1IC0yLjY4NzUsLTIuNjg3NXpNNjcuMTg3NSw2Ny40NDk5NWMtMS42MTY3LDAgLTIuNjg3NSwxLjM0Mzc1IC0yLjQyNTA1LDIuNjg3NWwyLjY4NzUsNTMuNzVjLTAuMjYyNDUsMS4zNDM3NSAxLjA4MTMsMi40MjUwNSAyLjQyNTA1LDIuNDI1MDVjMS42MTY3LDAgMi42ODc1LC0xLjM0Mzc1IDIuNjg3NSwtMi42ODc1bC0yLjY4NzUsLTUzLjc1YzAsLTEuNjE2NyAtMS4zNDM3NSwtMi42ODc1IC0yLjY4NzUsLTIuNDI1MDV6TTExNS44MjQ5NSw2Ny40NDk5NWMtMS42MDYyLDAgLTIuNjg3NSwxLjA4MTMgLTIuNjg3NSwyLjQyNTA1bC0yLjY4NzUsNTMuNzVjLTAuMjYyNDUsMS4zNDM3NSAwLjgwODM1LDIuNjg3NSAyLjQyNTA1LDIuNjg3NWMxLjYxNjcsMCAyLjY4NzUsLTEuMDgxMyAyLjY4NzUsLTIuNDI1MDVsMi42ODc1LC01My43NWMwLC0xLjYwNjIgLTEuMDgxMywtMi42ODc1IC0yLjQyNTA1LC0yLjY4NzV6TTYxLjgxMjUsMTM5Ljc1Yy0xLjYxNjcsMCAtMi42ODc1LDEuMDcwOCAtMi42ODc1LDIuNjg3NWMwLDEuNjE2NyAxLjA3MDgsMi42ODc1IDIuNjg3NSwyLjY4NzVoMzcuNjI1YzEuNjE2NywwIDIuNjg3NSwtMS4wNzA4IDIuNjg3NSwtMi42ODc1YzAsLTEuNjE2NyAtMS4wNzA4LC0yLjY4NzUgLTIuNjg3NSwtMi42ODc1ek0xMTAuMTg3NSwxMzkuNzVjLTEuNjE2NywwIC0yLjY4NzUsMS4wNzA4IC0yLjY4NzUsMi42ODc1YzAsMS42MTY3IDEuMDcwOCwyLjY4NzUgMi42ODc1LDIuNjg3NWgxMC43NWMxLjYxNjcsMCAyLjY4NzUsLTEuMDcwOCAyLjY4NzUsLTIuNjg3NWMwLC0xLjYxNjcgLTEuMDcwOCwtMi42ODc1IC0yLjY4NzUsLTIuNjg3NXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                    />
                  }
                ></ButtonComponent>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1 className="pageTitle">Article to sell</h1>
        {this.state.productOfThisUser.map((product, index) =>
          this.renderProduct(product, index)
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.userReducer.id,
  token: state.userReducer.token,
});
const mapDispatchToProps = {
  setIdProduct

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductEditComponent));

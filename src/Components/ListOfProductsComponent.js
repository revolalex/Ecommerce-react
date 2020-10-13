import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { setProducts } from "../store/action/products";
import axios from "axios";
import { connect } from "react-redux";
import "./ListOfProduct.css";

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.productClick = this.productClick.bind(this)
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/`)
      .then((result) => {
        this.setState({
          data: result.data,
        });
        this.props.setProducts(result.data);
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }
  productClick(id){
    console.log("IDCLICK",id)
    localStorage.setItem("productIdClick", JSON.stringify(id));
  }

  render() {
    return (
      <div id="myRow">
        <Container className="testContainer">
          <Row className="justify-content-md-center">
          {this.props.products.map((product) => this.renderProduct(product))}
          </Row>
        </Container>
      </div>
    );
  }

  renderProduct(product) {
    return (
      <Col className="testCol" md="auto" key={product.id}>
        <Card
          className="box"
          border="info"
          bg="dark"
          text="light"
          style={{ width: "18rem" }}
        >
          <Card.Header>{product.category}</Card.Header>
          <Card.Img className="testImg" variant="top" src={product.url} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <a
              href="/productCard2"
              onClick={() => {
                localStorage.setItem(
                  "productIdClick",
                  JSON.stringify(product.id)
                );
              }}
            >
              More Info
            </a>
          </Card.Body>
          <Card.Footer text="light">{product.prices} €</Card.Footer>
        </Card>
      </Col>
    );
  }
}
// mapStateToProps: called every time the store state changes. 
// It receives the entire store state, and should return 
// an object of data this component needs.
const mapStateToProps = (state) => ({
  products: state.productReducer.products,
});
// If it’s an object full of action creators, each action 
// creator will be turned into a prop function that 
// automatically dispatches its action when called. 
const mapDispatchToProps = {
  setProducts,
};
// connect function for you to read values from
//  the Redux store (and re-read the values when the store updates).
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
















// import React, { Component } from "react";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import {setProducts} from '../store/action/products'
// import axios from "axios";
// import "./ListOfProduct.css";
// import {connect} from 'react-redux'
// class ProductListPage extends Component {
//   constructor(props) {
//     super(props);
//     this.productClick = this.productClick.bind(this)
//   }
//   componentDidMount() {
//     axios
//       .get(`http://localhost:8080/products/`)
//       .then((result) => {
//         this.props.setProduct(result.data)
//       })
//       .catch(() => {
//         console.log("Oops, request failed!");
//       });
//   }
//   productClick(id){
//     console.log("IDCLICK",id)
//     localStorage.setItem("productIdClick", JSON.stringify(id));
//   }

//   render() {
//     return (
//       <div id="myRow">
//         <Container className="testContainer">
//           <Row className="justify-content-md-center">
//             {this.props.products.map((product) => this.renderProduct(product))}
//           </Row>
//         </Container>
//       </div>
//     );
//   }
//   renderProduct(product) {
//     return (
//       <Col className="testCol" md="auto" key={product.id}>
//         <Card
//           className="box"
//           border="info"
//           bg="dark"
//           text="light"
//           style={{ width: "18rem" }}
          
//         >
//           <Card.Header>{product.category}</Card.Header>
//           <Card.Img className="testImg" variant="top" src={product.url} />
//           <Card.Body>
//             <Card.Title>{product.name}</Card.Title>
//             <Card.Text>{product.description}</Card.Text>
//             <a href="/productCard2" onClick={()=>{localStorage.setItem("productIdClick", JSON.stringify(product.id))}}>More Info</a>
//           </Card.Body>
//           <Card.Footer text="light">{product.prices} €</Card.Footer>
//         </Card>
//       </Col>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   products: state.productReducer.products
// })

// const mapDispatchToProps = {
//   setProducts
// }

// export default connect(mapStateToProps,mapDispatchToProps) (ProductListPage);
import React, { Component } from "react";
import "./Sign.css";
import axios from "axios";
import { connect } from "react-redux";

class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:[],
      token: [],
      category: "",
      name: "",
      description: "",
      url: "",
      prices: "",
      id_user_affiliate: "",
      submitOk: false,
      headerWithToken: {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      },
    };
    this.handleUrl = this.handleUrl.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePrices = this.handlePrices.bind(this);
    this.buttonIsClick = this.buttonIsClick.bind(this);
  }

  handleCategory(event) {
    this.setState({
      category: event.target.value,
    });
  }
  handleDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }
  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handlePrices(event) {
    this.setState({
      prices: event.target.value,
    });
  }
  handleUrl(event) {
    this.setState({
      url: event.target.value,
    });
  }
  buttonIsClick(e) {
    console.log("HEADER REQUEST POST", this.state.headerWithToken);
    e.preventDefault();
    let productObject = {
      category: this.state.category,
      name: this.state.name,
      description: this.state.description,
      url: this.state.url,
      prices: this.state.prices,
      id_user_affiliate: this.props.id,
    };

    if (productObject.category.length < 2) {
      alert("category error: min 2 characters");
    } else if (productObject.name.length < 3) {
      alert("name error: min 3 characters");
    } else if (productObject.description.length < 10) {
      alert("description required min 10 characters");
    } else if (productObject.url.length < 10) {
      alert("url of product picture required min 10 characters");
    } else if (productObject.prices.length < 1) {
      alert("Price missing");
    } else {
      try {
        console.log(productObject);
        axios
          .post(
            "http://localhost:8080/products/",
            productObject,
            this.state.headerWithToken
          )
          .then((result) => {
            console.log(result);

            this.setState({
              submitOk: true,
            });

            // reset input
            this.setState({
              category: "",
              name: "",
              description: "",
              url: "",
              prices: "",
              id_user_affiliate: "",
            });
          })
          .catch(() => {
            console.log("Oops, request failed!");
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    let submitProduct;
    const submitTestDone = this.state.submitOk;
    if (submitTestDone) {
      submitProduct = <p id="submitOk">Product Added !</p>;
    } else {
      submitProduct = <p id="submitOk"></p>;
    }
    return (
      <div>
        <div className="login-box">
          <h2>Add an article</h2>
          <form>
            <div className="user-box">
              <input
                type="text"
                name="category"
                value={this.state.category}
                onChange={this.handleCategory}
                required
              ></input>
              <label>Category</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="descrition"
                value={this.state.description}
                onChange={this.handleDescription}
                required
              ></input>
              <label>Short Description</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleName}
                required
              ></input>
              <label>Product Name</label>
            </div>
            <div className="user-box">
              <input
                type="number"
                name="price"
                value={this.state.prices}
                onChange={this.handlePrices}
                required
              ></input>
              <label>Price</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="picture"
                value={this.state.url}
                onChange={this.handleUrl}
                required
              ></input>
              <label>Picture</label>
              <img className="uploadImg" src={this.state.url} alt="" />
            </div>
            <a href="/#" onClick={this.buttonIsClick}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
            {submitProduct}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  id : state.userReducer.id
})

export default connect(mapStateToProps,null) (CreateProductPage);

import React, { Component } from "react";
import "../Styles/Sign.css";
import axios from "axios";
import { connect } from "react-redux";
import UserBox from "./Small/UserBox";
import ButtonComponent from "./Small/ButtonComponent";

class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      name: "",
      description: "",
      url: "",
      prices: "",
      idUser: this.props.id,
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

  componentDidMount() {
    axios.get(`http://localhost:8080/products/${localStorage.getItem("productIdToEdit")}`)
    .then((result) => {
      this.setState({
        category: result.data[0].category,
        name: result.data[0].name,
        description: result.data[0].description,
        url: result.data[0].url,
        prices: result.data[0].prices,
        id_user_affiliate: result.data[0].id_user_affiliate,
      });
    })
    .catch(() => {
      console.log("Oops, request failed!");
    });
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
    console.log(localStorage.getItem("productIdToEdit"));
    console.log(this.props.id);
    let productIdToEdit = localStorage.getItem("productIdToEdit");
    e.preventDefault();
    let productObject = {
      category: this.state.category,
      name: this.state.name,
      description: this.state.description,
      url: this.state.url,
      prices: this.state.prices,
      idUser: this.props.id,
      id_user_affiliate: this.props.id,
    };
    switch (true) {
      case productObject.category.length < 2:
        alert("category error: min 2 characters");
        break;
      case productObject.name.length < 3:
        alert("name error: min 3 characters");
        break;
      case productObject.description.length < 10:
        alert("description required min 10 characters");
        break;
      case productObject.url.length < 10:
        alert("url of product picture required min 10 characters");
        break;
      case productObject.prices.length < 1:
        alert("Price missing");
        break;
      default:
        try {
          console.log("PRODUCT OBJECT EDIT",productObject);
          axios
            .post(
              `http://localhost:8080/productEdit/${productIdToEdit}`,
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
    const formInput = [
      {
        type: "text",
        name: "category",
        value: this.state.category,
        onChange: this.handleCategory,
        label: "Category",
        id: 1,
      },
      {
        type: "text",
        name: "descrition",
        value: this.state.description,
        onChange: this.handleDescription,
        label: "Description",
        id: 2,
      },
      {
        type: "text",
        name: "name",
        value: this.state.name,
        onChange: this.handleName,
        label: "Name",
        id: 3,
      },
      {
        type: "number",
        name: "prices",
        value: this.state.prices,
        onChange: this.handlePrices,
        label: "Prices",
        id: 4,
      },
      {
        type: "text",
        name: "picture",
        value: this.state.url,
        onChange: this.handleUrl,
        label: "Picture",
        id: 5,
      },
    ];
    let submitProduct;
    const submitTestDone = this.state.submitOk;
    if (submitTestDone) {
      submitProduct = <p id="submitOk">Product Edited !</p>;
    } else {
      submitProduct = <p id="submitOk"></p>;
    }

    return (
      <div>
        <div className="login-box">
          <h2>Edit Product</h2>
          <form>
            {formInput.map((elem) => {
              return <UserBox props={elem} key={elem.id} />;
            })}
            <img className="uploadImg" src={this.state.url} alt="" />
            <ButtonComponent click={this.buttonIsClick} text="Edit" />

            {submitProduct}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  productIdToEdit: state.productReducer.productIdToEdit,
  id: state.userReducer.id
});

export default connect(mapStateToProps)(CreateProductPage);
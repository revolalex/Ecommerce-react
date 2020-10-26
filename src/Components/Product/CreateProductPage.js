import React, { Component } from "react";
import "../../Styles/Sign.css";
import axios from "axios";
import { connect } from "react-redux";
import UserBox from "../Small/UserBox";
import ButtonComponent from "../Small/ButtonComponent";
import TitleComponent from "../Small/TitleComponent";
import { Button } from "react-bootstrap";

class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      name: "",
      description: "",
      url: "",
      allUrlImg: [],
      prices: "",
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

  moreImgButton() {
    this.setState(
      { allUrlImg: this.state.allUrlImg.concat(this.state.url) },
      () => {
        this.setState({
          url: "",
        });
        console.log(this.state.allUrlImg);
      }
    );
    alert(`${this.state.allUrlImg.length + 1} pictures added`);
  }

  buttonIsClick(e) {
    console.log("HEADER REQUEST POST", this.state.headerWithToken);
    e.preventDefault();
    let productObject = {
      category: this.state.category,
      name: this.state.name,
      description: this.state.description,
      url: this.state.url,
      allUrlImg: [],
      prices: this.state.prices,
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
          console.log(this.props);
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
                allUrlImg: [],
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
  renderProductImg(arrayImg) {
    {
      arrayImg.forEach((elem) => {
        console.log(elem);
        return <img className="uploadImg" src={elem} alt="" />;
      });
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
        label: "Picture url",
        id: 5,
      },
    ];

    return (
      <div id="addArrticleDiv">
        <TitleComponent text1="sell" text2="&nbsp; article" />
        <div className="login-box">
          <h2>Add an article</h2>
          <form>
            {formInput.map((elem) => {
              return <UserBox props={elem} key={elem.id} />;
            })}
            <Button
              variant="outline-info"
              onClick={this.moreImgButton.bind(this)}
            >
              More Picture
            </Button>{" "}
            <img className="uploadImg" src={this.state.url} alt="" />
            {this.state.allUrlImg.forEach((elem)=>{
              console.log(elem)
              return <img className="uploadImg" src={elem} alt="" />
            })}
            {this.renderProductImg(this.state.allUrlImg)}
            <ButtonComponent
              click={this.buttonIsClick}
              text="Create a Product"
            />
            {this.state.submitOk === true ? (
              <p id="submitOk">Product Added !</p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  id: state.userReducer.id,
});

export default connect(mapStateToProps, null)(CreateProductPage);

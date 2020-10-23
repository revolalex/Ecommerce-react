import React, { Component } from "react";
import "../Sign/Sign.css";
import axios from "axios";
import { connect } from "react-redux";
import UserBox from "../User/UserBox";
import ButtonComponent from "../Others/button";
import { withRouter } from "react-router-dom";
import "./EditProduct.css";
import { Form } from "react-bootstrap";


class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      name: "",
      description: "",
      url: "",
      prices: "",
      promotion: "",
      promotionIsActive: 0,
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
    this.handlePromotion = this.handlePromotion.bind(this) 
    this.handlePromotionIsActive = this.handlePromotionIsActive.bind(this) 

  }

  componentDidMount() {
    try {
      axios
        .get(
          `http://localhost:8080/products/${this.props.idProduct}`
        )
        .then((result) => {
          this.setState({
            category: result.data[0].category,
            name: result.data[0].name,
            description: result.data[0].description,
            url: result.data[0].url,
            prices: result.data[0].prices,
            id_user_affiliate: result.data[0].id_user_affiliate,
            promotion: result.data[0].promotion,
            promotionIsActive: result.data[0].promotionIsActive
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
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
  handlePromotion(event){
    this.setState({
      promotion: event.target.value
    })
  }
  handlePromotionIsActive(){
    if(this.state.promotionIsActive === 1){
      this.setState({
      promotionIsActive : 0
      })
    } else {
      this.setState({
        promotionIsActive : 1
      })
    }
    
  }
  buttonIsClick(e) {
    e.preventDefault();
    let productObject = {
      category: this.state.category,
      name: this.state.name,
      description: this.state.description,
      url: this.state.url,
      prices: this.state.prices,
      idUser: this.props.id,
      id_user_affiliate: this.props.id,
      promotion: this.state.promotion,
      promotionIsActive: this.state.promotionIsActive
    };
    switch (true) {
      case productObject.category.length < 2:
        alert("Category error: min 2 characters");
        break;
      case productObject.name.length < 3:
        alert("Name error: min 3 characters");
        break;
      case productObject.description.length < 10:
        alert("Description required min 10 characters");
        break;
      case productObject.url.length < 10:
        alert("Url of product picture required min 10 characters");
        break;
      case productObject.prices.length < 1:
        alert("Price missing");
        break;
      default:
        try {
          axios
            .post(
              `http://localhost:8080/productEdit/${this.props.idProduct}`,
              productObject,
              this.state.headerWithToken
            )
            .then(() => {
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
                promotion: ""
              });
              let that = this;
              setTimeout(function() {
                that.props.history.push("/editProfil");
              }, 500);
            })
            .catch((err) => {
                console.log(err);
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
      {
        type: "number",
        name: 'promotion',
        value: this.state.promotion,
        onChange: this.handlePromotion,
        label: "Promotion",
        id: 6
      }
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
        <div className="login-box-Edit">
          <h2>Edit Product</h2>
          <img className="uploadImgEditProduct" src={this.state.url} alt="" />
          <br />
          <br />
          <form>
            {formInput.map((elem) => {
              return <UserBox props={elem} key={elem.id} />;
            })}
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                onClick={this.handlePromotionIsActive}
                label={this.state.promotionIsActive === 1 ? "Sale active" : "Sale not active"}
                style={{color: "white"}}
              />
            </Form>
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
  id: state.userReducer.id,
  idProduct:  state.productReducer.id
});

export default connect(mapStateToProps)(withRouter(CreateProductPage));
import React, { Component } from "react";
import "./Login.css";

class AddingProductComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
          url: ""
        }
        this.handleChange = this.handleChange.bind(this)
      }
      handleChange(event) {
        this.setState({
          file: event.target.text
        })
      }
  render() {
    return (
      <div>
        <div class="box">
          <div class="wave -one"></div>
          <div class="wave -two"></div>
          <div class="wave -three"></div>
        </div>
        <div className="login-box">
          <h2>Add an article</h2>
          <form>
            <div className="user-box">
              <input type="text" name="category" required=""></input>
              <label>Category</label>
            </div>
            <div className="user-box">
              <input type="password" name="descrition" required=""></input>
              <label>Short Description</label>
            </div>
            <div className="user-box">
              <input type="text" name="name" required=""></input>
              <label>Product Name</label>
            </div>
            <div className="user-box">
              <input type="number" name="price" required=""></input>
              <label>Price</label>
            </div>
            <div className="user-box">
              <input type="file" name="picture" required="" onChange={this.handleChange}></input>
              <label>Picture</label>
              <img className="uploadImg" src={this.state.file}/>
            </div>
            <a href="">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
          </form>
        </div>
      </div>
    );
  }
}
export default AddingProductComponent;

// let category = req.body.category;
// let prices = req.body.prices;
// let name = req.body.name;
// let description = req.body.description;
// let id_user_affiliate = req.body.id_user_affiliate;
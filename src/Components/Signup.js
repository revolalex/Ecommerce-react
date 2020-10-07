import React, { Component } from "react";
import "./Login.css";

class SignupComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: event.target.value
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
          <h2>Sign up</h2>
          <img className="profileImg" src={this.state.file}/>
          <form>
            <div className="user-box">
              <input type="text" name="firstName" required=""></input>
              <label>First Name</label>
            </div>
            <div className="user-box">
              <input type="text" name="lastName" required=""></input>
              <label>Last Name</label>
            </div>
            <div className="user-box">
              <input type="text" name="" required="" onChange={this.handleChange}></input>
              <label>Profil Picture url</label>
              
            </div>
            <div className="user-box">
              <input type="email" name="" required=""></input>
              <label>email</label>
            </div>
            <div className="user-box">
              <input type="password" name="" required=""></input>
              <label>Password</label>
            </div>
            <div className="user-box">
              <input type="password" name="" required=""></input>
              <label>Confirm Password</label>
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
export default SignupComponent;

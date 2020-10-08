import React, { Component } from "react";
import "./Login.css";

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      password: "",
      confirmPassword: "",
      passTest: Boolean,
    };
    this.handleImgProfile = this.handleImgProfile.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
  }
  handleImgProfile(event) {
    this.setState({
      url: event.target.value,
    });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value,}, () => {
      this.comparePassword();
    });
  }
  // The second (optional) parameter is a callback function that 
  // will be executed once setState is completed and the 
  // component is re-rendered.
  handlePasswordConfirm(event) {
    this.setState({ confirmPassword: event.target.value }, () => {
      this.comparePassword();
    });
  }
  comparePassword() {
    console.log(this.state.password);
    console.log(this.state.confirmPassword);
    this.setState({
      passTest: this.state.password === this.state.confirmPassword,
    });
    console.log(this.state.passTest);
  }
  render() {
    let textConfPass;
    const passwordMatch = this.state.passTest;
    if (passwordMatch) {
      textConfPass = <p></p>;
    } else {
      textConfPass = <p className="passAlert">password not match</p>;
    }

    return (
      <div>
        <div className="box">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
        
        <div className="login-box">
          <h2>Sign up</h2>
          <img className="profileImg" src={this.state.url} alt="" />
          
         
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
              <input
                type="text"
                name=""
                required=""
                onChange={this.handleImgProfile}
              ></input>
              <label>Profil Picture url</label>
            </div>
            <div className="user-box">
              <input type="email" name="email" required=""></input>
              <label>email</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="password"
                required=""
                onChange={this.handlePassword}
              ></input>
              <label>Password</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="confirmPassword"
                required=""
                onChange={this.handlePasswordConfirm}
              ></input>
              <label>Confirm Password</label>
              {textConfPass}
            </div>
            <a href="t">
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

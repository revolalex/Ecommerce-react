import React, { Component } from "react";
import "./Sign.css";
import axios from "axios";

class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: "",
      auth: false,
      id: "",
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.buttonIsClick = this.buttonIsClick.bind(this);
    this.saveTokenToLocalStorage = this.saveTokenToLocalStorage.bind(this);
    this.saveIdToLocalStorage = this.saveIdToLocalStorage.bind(this)
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  saveTokenToLocalStorage = () => {
    localStorage.setItem("token", JSON.stringify(this.state.token));
    console.log("storeLOCALTOKEN", localStorage);
  };
  saveIdToLocalStorage = () => {
    localStorage.setItem("id", JSON.stringify(this.state.id));
    console.log("storeLOCALID", localStorage);
  };
  buttonIsClick(e) {
    const { history } = this.props;
    e.preventDefault();
    let userObject = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userObject);
    try {
      axios
        .post(`http://localhost:8080/users/sign-in/`, userObject)
        .then((result) => {
          console.log("RESULT TOKEN", result.data.token);
          this.setState({
            token: result.data.token,
          });
          this.setState({
            id: result.data.id,
          });
          this.saveIdToLocalStorage();

          this.saveTokenToLocalStorage();
          console.log("TOKEN", this.state.token);
          if (result.data.auth === true) {
            console.log("auth is true", result);
            history.push("/addProduct");
          }
        })
        .catch(() => {
          console.log("Oops, request failed!");
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div className="login-box">
          <h2>Sign-In</h2>
          <form>
            <div className="user-box">
              <input
                type="text"
                name="email"
                required=""
                value={this.state.email}
                onChange={this.handleEmail}
              ></input>
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required=""
                value={this.state.password}
                onChange={this.handlePassword}
              ></input>
              <label>Password</label>
            </div>
            <a href="/#" onClick={this.buttonIsClick}>
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
export default SignInComponent;

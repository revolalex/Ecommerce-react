import React, { Component } from "react";
import { connect } from "react-redux";
import "./Sign.css";
import axios from "axios";
import {setToken,setID,authTrue} from "../store/actions/user"
import ButtonComponent from "./ButtonComponent"

class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.buttonIsClick = this.buttonIsClick.bind(this);
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

  buttonIsClick(e) {
    e.preventDefault();
    let userObject = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      axios
        .post(`http://localhost:8080/users/sign-in/`, userObject)
        .then((result) => {
          if (result.data === "Sorry, email incorrect") {
            alert("Sorry, email incorrect");
          }else if (result.data === "password error") {
            alert("Password error");
          } else {
            this.props.setToken(result.data.token)
            console.log(result.data.id); // fonctionne bien []
            this.props.setID(result.data.id)
            console.log("IDSET", this.props.id); // = undefined
            this.props.authTrue()
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div id="myContainer">
        <div className="login-box">
          <h2>Sign-In</h2>
          <form>
            <div className="user-box">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleEmail}
                required
              ></input>
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handlePassword}
                required
              ></input>
              <label>Password</label>
            </div>
            <ButtonComponent click={this.buttonIsClick} text= "Sign-in" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  id: state.userReducer.ID
})

const mapDispatchToProps = {
  setToken,
  setID,
  authTrue
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);

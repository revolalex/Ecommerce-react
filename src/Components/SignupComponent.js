import React, { Component } from "react";
import "./Login.css";
import axios from "axios"

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      firstName:"",
      lastName: "",
      url: "",
      email:"",
      password: "",
      confirmPassword: "",
      passTest: Boolean,
    };
     // Cette liaison est nécéssaire afin de permettre
    // l'utilisation de `this` dans la fonction de rappel.
    this.handleImgProfile = this.handleImgProfile.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
    this.buttonIsClick = this.buttonIsClick.bind(this)
    this.handleFirstName = this.handleFirstName.bind(this)
    this.handleLastName = this.handleLastName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
  }
  handleFirstName(event){
    this.setState({
      firstName: event.target.value
    })
  }
  handleLastName(event){
    this.setState({
      lastName: event.target.value
    })
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
  handleEmail(event){
    this.setState({
      email: event.target.value
    })
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
    this.setState({
      passTest: this.state.password === this.state.confirmPassword,
    });
  }
  buttonIsClick(e){
    e.preventDefault();
    let userObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      url: this.state.url,
      email: this.state.email,
      password: this.state.password
    }
    console.log(userObject);
    try {
      axios.post(`http://localhost:8080/users/sign-up/`,userObject)
    .then((result) => {
      console.log(result)
    })
    .catch(() => {
      console.log("Oops, request failed!")
    })
      
    } catch (error) {
      console.log(error);
    }
    
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

        
        <div className="login-box">
          <h2>Sign up</h2>
          <img className="profileImg" src={this.state.url} alt="" />
          
         
          <form>
            <div className="user-box">
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstName} required=""></input>
              <label>First Name</label>
            </div>
            <div className="user-box">
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastName}   required=""></input>
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
              <input type="email" name="email" value={this.state.email} onChange={this.handleEmail}   required=""></input>
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
            <a href="" onClick={this.buttonIsClick}>
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

import React, { Component } from "react";
import "./Login.css";
import axios from "axios";

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      url: "",
      email: "",
      password: "",
      confirmPassword: "",
      passTest: Boolean,
      submitOk: false,
    };
    // Cette liaison est nécéssaire afin de permettre
    // l'utilisation de `this` dans la fonction de rappel.
    this.handleImgProfile = this.handleImgProfile.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
    this.buttonIsClick = this.buttonIsClick.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }
  handleFirstName(event) {
    this.setState({
      firstName: event.target.value,
    });
  }
  handleLastName(event) {
    this.setState({
      lastName: event.target.value,
    });
  }
  handleImgProfile(event) {
    this.setState({
      url: event.target.value,
    });
  }
  // The second (optional) parameter is a callback function that
  // will be executed once setState is completed and the
  // component is re-rendered.
  handlePassword(event) {
    this.setState({ password: event.target.value }, () => {
      this.comparePassword();
    });
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value,
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
    this.setState({
      passTest: this.state.password === this.state.confirmPassword,
    });
  }
  // post user to DB
  buttonIsClick(e) {
    e.preventDefault();
    let userObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      url: this.state.url,
      email: this.state.email,
      password: this.state.password,
    };
    var mailformat = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (userObject.firstName.length < 3) {
      alert("first name error: min 3 character");
    } else if (userObject.lastName.length < 3) {
      alert("last name error: min 3 character");
    } else if (userObject.url.length < 10) {
      alert("url profile picture require");
    } else if (userObject.password < 8) {
      alert("password minimun 8 character");
    } else if (!userObject.email.match(mailformat)) {
      alert("email incorrect");
    } else if (userObject.password !== this.state.confirmPassword) {
      alert("confirm password error");
    } else {
      console.log(userObject);
      try {
        axios
          .post(`http://localhost:8080/users/sign-up/`, userObject)
          .then((result) => {
            console.log("RESULT", result);
            if (result.data === "Utilisateur enregistré") {
              this.setState({
                submitOk: true,
              });
              // reset input
              this.setState({
                firstName: "",
                lastName: "",
                url: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }
            if (result.data === "error") {
              alert("request error");
            }
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
    let testConfirmPassword;
    const passwordMatch = this.state.passTest;
    if (passwordMatch) {
      testConfirmPassword = <p></p>;
    } else {
      testConfirmPassword = <span id="formTestPass">Password not match</span>;
    }

    let submitUserTest;
    const submitTestDone = this.state.submitOk;
    if (submitTestDone) {
      submitUserTest = <p id="submitOk">User Created, please sign-in !</p>;
    } else {
      submitUserTest = <p id="submitOk"></p>;
    }

    let passwordCharCheck;
    if (this.state.password.length > 7) {
      passwordCharCheck = <p id="formTest"></p>;
    } else {
      // passwordCharCheck = <span id="formTest">Min 8 characters</span>;
      passwordCharCheck = (
        <span id="formTest">
          Min 8 characters, need {8 - this.state.password.length} more
        </span>
      );
    }

    let requireFirstName;
    if (this.state.firstName.length < 3) {
      requireFirstName = <span id="formTestNames">Min 3 character</span>;
    }

    let requireLastName;
    if (this.state.lastName.length < 3) {
      requireLastName = <span id="formTestNames">Min 3 character</span>;
    }

    let requireUrl;
    if (this.state.url.length < 10) {
      requireUrl = <span id="formTestUrl">Require</span>;
    }

    let emailTestFormat;
    var mailformat = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (this.state.email.match(mailformat)) {
      emailTestFormat = <span id="formTestEmail"></span>;
    } else {
      emailTestFormat = <span id="formTestEmail">valid email required</span>;
    }

    return (
      <div>
        <div className="login-box">
          <h2>Sign up</h2>
          <img className="profileImg" src={this.state.url} alt="" />

          <form>
            <div className="user-box">
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleFirstName}
                required
              ></input>
              <label>First Name {requireFirstName}</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleLastName}
                required
              ></input>
              <label>Last Name {requireLastName}</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleImgProfile}
                required
              ></input>
              <label>Profil Picture url {requireUrl}</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleEmail}
                required
              ></input>
              <label>Email {emailTestFormat}</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handlePassword}
                required
              ></input>

              <label>Password {passwordCharCheck}</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handlePasswordConfirm}
                required
              ></input>
              <label>Confirm Password {testConfirmPassword}</label>
            </div>

            <a href="/#" onClick={this.buttonIsClick} type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
            {submitUserTest}
          </form>
        </div>
      </div>
    );
  }
}
export default SignupComponent;
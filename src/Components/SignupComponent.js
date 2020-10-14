import React, { Component } from "react";
import "./Sign.css";
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
        {/* Animation */}
        <div id="splash">
          <div className="anim">
            <div id="loader">
              <svg version="1.1" width="60px" height="70px" viewBox="0 0 60 70">
                <defs>
                  <filter id="f1" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  </filter>
                </defs>
                <g id="airplane">
                  <path
                    fill="#000"
                    d="M0.677,20.977l4.355,1.631c0.281,0.104,0.579,0.162,0.88,0.16l9.76-0.004L30.46,41.58c0.27,0.34,0.679,0.545,1.112,0.541
          h1.87c0.992,0,1.676-0.992,1.322-1.918l-6.643-17.439l6.914,0.002l6.038,6.037c0.265,0.266,0.624,0.412,0.999,0.418l1.013-0.004
          c1.004-0.002,1.684-1.012,1.312-1.938l-2.911-7.277l2.912-7.278c0.372-0.928-0.313-1.941-1.313-1.938h1.017
          c-0.375,0-0.732,0.15-0.996,0.414l-6.039,6.039h-6.915l6.646-17.443c0.354-0.926-0.33-1.916-1.321-1.914l-1.87-0.004
          c-0.439,0.004-0.843,0.203-1.112,0.543L15.677,17.24l-9.765-0.002c-0.3,0.002-0.597,0.055-0.879,0.16L0.678,19.03
          C-0.225,19.36-0.228,20.637,0.677,20.977z"
                    transform="translate(44,0) rotate(90 0 0)"
                  />
                </g>
                <g id="shadow" transform="scale(.9)">
                  <path
                    fill="#000"
                    fillOpacity="0.3"
                    d="M0.677,20.977l4.355,1.631c0.281,0.104,0.579,0.162,0.88,0.16l9.76-0.004L30.46,41.58c0.27,0.34,0.679,0.545,1.112,0.541
      		h1.87c0.992,0,1.676-0.992,1.322-1.918l-6.643-17.439l6.914,0.002l6.038,6.037c0.265,0.266,0.624,0.412,0.999,0.418l1.013-0.004
      		c1.004-0.002,1.684-1.012,1.312-1.938l-2.911-7.277l2.912-7.278c0.372-0.928-0.313-1.941-1.313-1.938h1.017
      		c-0.375,0-0.732,0.15-0.996,0.414l-6.039,6.039h-6.915l6.646-17.443c0.354-0.926-0.33-1.916-1.321-1.914l-1.87-0.004
      		c-0.439,0.004-0.843,0.203-1.112,0.543L15.677,17.24l-9.765-0.002c-0.3,0.002-0.597,0.055-0.879,0.16L0.678,19.03
      		C-0.225,19.36-0.228,20.637,0.677,20.977z"
                    transform="translate(64,30) rotate(90 0 0)"
                    filter="url(#f1)"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignupComponent;

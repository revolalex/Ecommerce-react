import React, { Component } from "react";
import { connect } from "react-redux";
import ButtonComponent from "./ButtonComponent";
import UserBox2 from "./UserBox2";
import "./EditProfilComponent.css";

class EditProfilComponent extends Component {
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

  componentDidMount() {}

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
    var mailformat = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let userObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      url: this.state.url,
      email: this.state.email,
      password: this.state.password,
    };
    switch (true) {
      case userObject.firstName.length < 3:
        alert("first name error: min 3 character");
        break;
      case userObject.lastName.length < 3:
        alert("last name error: min 3 character");
        break;
      case userObject.url.length < 10:
        alert("url profile picture require");
        break;
      case userObject.password < 8:
        alert("password minimun 8 character");
        break;
      case !userObject.email.match(mailformat):
        alert("email incorrect");
        break;
      case userObject.password !== this.state.confirmPassword:
        alert("confirm password error");
        break;
      default:
        try {
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
      testConfirmPassword = <span id="formTest2">Password not match</span>;
    }

    let submitUserTest;
    const submitTestDone = this.state.submitOk;
    if (submitTestDone) {
      submitUserTest = <p id="submitOk2">User edited !</p>;
    } else {
      submitUserTest = <p id="submitOk2"></p>;
    }

    let passwordCharCheck;
    if (this.state.password.length > 7) {
      passwordCharCheck = <p id="formTest2"></p>;
    } else {
      passwordCharCheck = (
        <span id="formTest2">
          Min 8 characters, need {8 - this.state.password.length} more
        </span>
      );
    }
    let requireFirstName;
    if (this.state.firstName.length < 1) {
      requireFirstName = (
        <span id="formTestNames2">{this.props.user.firstName}</span>
      );
    }

    let requireLastName;
    if (this.state.lastName.length < 1) {
      requireLastName = (
        <span id="formTestNames2">{this.props.user.lastName}</span>
      );
    }

    let requireUrl;
    if (this.state.url.length < 10) {
      requireUrl = <span id="formTestUrl2">Required</span>;
    }

    let emailTestFormat;
    var mailformat = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (this.state.email.match(mailformat)) {
      emailTestFormat = <span id="formTestEmail2"></span>;
    } else {
      emailTestFormat = (
        <span id="formTestEmail2">{this.props.user.email}</span>
      );
    }
    const formInput = [
      {
        type: "text",
        name: "firstName",
        value: this.state.firstName,
        onChange: this.handleFirstName,
        label: "First Name :",
        label2: requireFirstName,
        id: 1,
      },
      {
        type: "text",
        name: " lastName",
        value: this.state.lastName,
        onChange: this.handleLastName,
        label: "Last Name :",
        label2: requireLastName,
        id: 2,
      },
      {
        type: "text",
        name: "url",
        value: this.state.url,
        onChange: this.handleImgProfile,
        label: "Profil Picture Url :",
        label2: requireUrl,
        id: 3,
      },
      {
        type: "text",
        name: "email",
        value: this.state.email,
        onChange: this.handleEmail,
        label: "Email :",
        label2: emailTestFormat,
        id: 4,
      },
      {
        type: "text",
        name: "password",
        value: this.state.password,
        onChange: this.handlePassword,
        label: "New Password :",
        label2: passwordCharCheck,
        id: 5,
      },
      {
        type: "text",
        name: "confirmPassword",
        value: this.state.confirmPassword,
        onChange: this.handlePasswordConfirm,
        label: "Confirm Password",
        label2: testConfirmPassword,
        id: 6,
      },
    ];
    let newUrl;
    if (this.state.firstName.length > 3) {
      newUrl = (
        <div className="editDiv">
          <p className="changeUrlP">Change to</p>
          <img className="profileImgEdit" src={this.state.url} alt="profil" />
          <p className="changeUrlP">{this.state.firstName}</p>
          <p className="changeUrlP">{this.state.lastName}</p>
          <p className="changeUrlP">{this.state.email}</p>
        </div>
      );
    }

    return (
      <div>
        <div className="login-box-Edit">
          <h2>Edit Your Profil</h2>
          <img
            className="profileImgEdit"
            src={this.props.user.url}
            alt="profil"
          />

          <form>
            {formInput.map((elem) => {
              return <UserBox2 form={elem} key={elem.id} />;
            })}
            <ButtonComponent
              text="Edit Your Profile"
              click={this.buttonIsClick}
            />
            {newUrl}
            {submitUserTest}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfilComponent);

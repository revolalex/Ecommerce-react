import React, { Component } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import ButtonComponent from "./button";
import UserBox2 from "./UserBox2";
import "./EditProfilComponent.css"

class EditProfileComponent extends Component {
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
  }

  
  componentDidMount() {}

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
      passwordCharCheck = (
        <span id="formTest">
          Min 8 characters, need {8 - this.state.password.length} more
        </span>
      );
    }

    let requireFirstName;
    if (this.state.firstName.length < 3) {
      requireFirstName = <span id="formTestNames">{this.props.user.firstName}</span>;
    }

    let requireLastName;
    if (this.state.lastName.length < 3) {
      requireLastName = <span id="formTestNames">{this.props.user.lastName}</span>;
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
      emailTestFormat = <span id="formTestEmail">{this.props.user.email}</span>;
    }
    const formInput = [
      {
        type: "text",
        name: "firstName",
        value: this.state.firstName,
        onChange: this.handleFirstName,
        label: "First Name",
        label2: requireFirstName,
        id: 1,
      },
      {
        type: "text",
        name: " lastName",
        value: this.state.lastName,
        onChange: this.handleLastName,
        label: "Last Name",
        label2: requireLastName,
        id: 2,
      },
      {
        type: "text",
        name: "url",
        value: this.state.url,
        onChange: this.handleImgProfile,
        label: "Profil Picture Url",
        label2: requireUrl,
        id: 3,
      },
      {
        type: "text",
        name: "email",
        value: this.state.email,
        onChange: this.handleEmail,
        label: "Email",
        label2: emailTestFormat,
        id: 4,
      },
      {
        type: "text",
        name: "password",
        value: this.state.password,
        onChange: this.handlePassword,
        label: "Password",
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
    console.log(this.props.user);
    return (
      <div>
        <div className="login-box-editProfil">
          <h2>Edit Your Profil</h2>
          <img className="profileImg" src={this.props.user.url} alt="" />
          <form>
            {formInput.map((elem) => {
              return <UserBox2 form={elem} key={elem.id} />;
            })}
            <ButtonComponent text="Edit Your Profile" click={this.buttonIsClick} />
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
)(EditProfileComponent);
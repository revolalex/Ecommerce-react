import React, { Component } from "react";
import "../../Styles/ProfilPictureComponent.css";
import { connect } from "react-redux";

class ProfilPictureComoponent extends Component {
  render() {
    return (
      <a className="myProfilPictureLink" href="/editProfil">
        <img id="profilImgUrl" src={this.props.user.url} alt="cart" />
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(ProfilPictureComoponent);


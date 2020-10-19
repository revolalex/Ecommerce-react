import React, { Component } from "react";
import "./ProfilPictureComponent.css";
import { connect } from "react-redux";

class ProfilPictureComoponent extends Component {
  render() {

    return (
      
      <a className="myProfilPictureLink" href="/#">
        <img
        //{this.props.users[0].url}
          id="profilImgUrl"
          src={this.props.user.url}
          alt="cart"
        />
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(ProfilPictureComoponent);

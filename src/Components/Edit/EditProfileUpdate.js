import React, { Component } from "react";

class ProdilUpdateEdit extends Component {
  render() {
    return (
      <div className="editDiv">
        <p className="changeUrlP">Change to</p>
        <img className="profileImgEdit" src={this.props.src}alt="profil" />
        <p className="changeUrlP">{this.props.firstName}</p>
        <p className="changeUrlP">{this.props.lastName}</p>
        <p className="changeUrlP">{this.props.email}</p>
      </div>
    );
  }
}

export default ProdilUpdateEdit;

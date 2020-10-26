import React, { Component } from "react";

class SalesLogoComponent extends Component {
  render() {
    return (
      <img
        id={this.props.id === undefined ? "saleImg" : this.props.id}
        src="https://www.icone-png.com/png/44/44044.png"
        alt="sale"
      ></img>
    );
  }
}

export default SalesLogoComponent;

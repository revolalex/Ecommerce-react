import React, { Component } from "react";
import"../../Styles/ButtonComponent.css"

class ButtonComponent extends Component {
  render() {
    return (
      <a className={this.props.class === undefined ? "myA" : this.props.class}
        href={this.props.link === undefined ? "/#" : this.props.link}
        onClick={
          this.props.click === undefined ? this.props.lol : this.props.click
        }
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {this.props.text}
      </a>
    );
  }
}

export default ButtonComponent;

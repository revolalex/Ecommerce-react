import React, { Component } from "react";

class UserBox extends Component {
  render() {
    return (
      <div className="user-box">
        <input
          type={this.props.props.type}
          name={this.props.props.name}
          value={this.props.props.value}
          onChange={this.props.props.onChange}
          required
        ></input>
        <label>{this.props.props.label}</label>
      </div>
    );
  }
}

export default UserBox;

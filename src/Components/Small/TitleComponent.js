import React, { Component } from "react";
import "../../Styles/TitleComponent.css";

class TitleComponent extends Component {
  render() {
    return (
      <div className="titleContainer">
        <h1>
          <div className="animation">
            <span className="first">{this.props.text1}</span>
            <span className="oh">
              <span className="second">{this.props.text2}</span>
            </span>
          </div>
        </h1>
      </div>
    );
  }
}

export default TitleComponent;

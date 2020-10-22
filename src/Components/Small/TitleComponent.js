import React, { Component } from "react";
import "../../Styles/TitleComponent.css"

class TitleComponent extends Component {
  render() {
    return (
      <div class="titleContainer">
        <h1>
          <div class="animation">
    <span class="first">{this.props.text1}</span>
            <span class="oh">
              <span class="second">{this.props.text2}</span>
            </span>
          </div>
        </h1>
      </div>
    );
  }
}

export default TitleComponent;

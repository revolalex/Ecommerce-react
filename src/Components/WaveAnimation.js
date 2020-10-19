import React, { Component } from "react";
import "../Styles/WaveAnimation.css";

class WaveAnimationComponent extends Component {
  render() {
    return (
      <div className="waveBox">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
    );
  }
}

export default WaveAnimationComponent;

import React, {Component} from 'react'

class Button extends Component {
    render(){
        return(
            <a href="/#" onClick={this.props.click}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
        )
    }
}

export default Button
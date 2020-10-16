import React, {Component} from 'react'

class ButtonComponent extends Component {
    render(){
        return(
            <a href={ this.props.link === undefined ? "/#" : this.props.link} onClick={this.props.click === undefined ? this.props.lol : this.props.click }>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {this.props.text}
            </a>
        )
    }
}

export default ButtonComponent
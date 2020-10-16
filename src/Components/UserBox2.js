import React, {Component} from 'react'

class UserBox2 extends Component {
    render(){
        return(
            <div className="user-box">
              <input
                type={this.props.form.type}
                name={this.props.form.name}
                value={this.props.form.value}
                onChange={this.props.form.onChange}
                required
              ></input>
              <label>{this.props.form.label} {this.props.form.label2}</label>
            </div>
        )
    }
}

export default UserBox2
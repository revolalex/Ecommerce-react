import React, { Component } from "react";
import "../../Styles/NavBar.css";
import { withRouter } from "react-router-dom";
import MyRouter from "../Router";
import { deleteToken, authFalse } from "../../store/actions/user";
import { resetHistoryOrders } from "../../store/actions/orders";
import { resetCategory } from "../../store/actions/category";
import { connect } from "react-redux";
import WaveAnimationComponent from "../Animation/WaveAnimation";
import NavbarWithToken from "./NavbarWithToken";
import NavbarWithoutToken from "./NavBarWithoutToken";

class Navbare extends Component {
  deleteToken() {
    this.props.authFalse();
    this.props.deleteToken();
    this.props.history.push("/");
    this.props.resetHistoryOrders();
    this.props.resetCategory();
  }

  render() {
    return (
      <div>
        <WaveAnimationComponent />
        {this.props.token ? <NavbarWithToken onClick={this.deleteToken.bind(this)} /> : <NavbarWithoutToken />}
        <MyRouter />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  auth: state.userReducer.auth,
});

const mapDispatchToProps = {
  deleteToken,
  authFalse,
  resetHistoryOrders,
  resetCategory,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbare));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleLogout } from '../../actions/LoginAction';

// import styles from './styles';

class Logout extends Component {

  componentDidMount(){
    this.props.handleLogout();
  }

  render() {
    return (
     <div>Loging out...</div>
    );
  }
}
const mapState = state => ({
  login: state.login,
});
const mapActions = dispatch => bindActionCreators({ handleLogout }, dispatch);

export default connect(
  mapState,
  mapActions,
)(Logout);


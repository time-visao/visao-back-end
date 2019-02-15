import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthUserRequest } from '../../actions/LoginAction';
import Loading from '../Loading';

class PrivateRoute extends Component {
  state = {
    loading: true,
  };

  // async componentWillMount() {
  //   console.log('!!!!');
  //   await this.props.getAuthUserRequest();
  // }

  async componentDidMount() {
    await this.props.getAuthUserRequest();
    this.setState({ loading: false });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.login.loading && !nextProps.login.loading) {
  //     this.setState({ loading: false });
  //   }
  // }

  render() {
    const RenderComponent = this.props.component;
    const login = this.props.login;

    return this.state.loading ? (
      <Loading />
    ) : (
      <Route render={props => (login.response ? <RenderComponent {...props} /> : <Redirect to="/login" />)} />
    );
  }
}
//   <Redirect to="/login"/>
const mapState = state => ({
  login: state.login,
});

const mapActions = dispatch => bindActionCreators({ getAuthUserRequest }, dispatch);

export default connect(
  mapState,
  mapActions,
)(PrivateRoute);

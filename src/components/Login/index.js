import React, { Component } from 'react';
import { Input, Button, Row, Col, Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FacebookLogin from 'react-facebook-login';
import { handleSubmit, handleFacebookLogin } from '../../actions/LoginAction';
import './styles.css';

class Login extends Component {
  state = {
    input: {
      email: '',
      password: '',
    },
  };
  componentDidMount() {
    console.log(this.props);
  }
  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      input: { ...this.state.input, [name]: value },
    });
  };

  render() {
    return (
      <div>
        <Row className="sub-content">
          <Col className="card  content-title-wrapper">
            <h3 className="content-title">Login</h3>
          </Col>
        </Row>
        <Row>
          {this.props.login.loginError ? (
            <Alert message="Erro no login. Verifique se o e-mail e a senha inseridos são válidos" type="error" />
          ) : (
            ''
          )}
          {this.props.login.loginUnauth ? (
            <Alert message="Erro no login. Você não possui autorização para acessar esta página" type="error" />
          ) : (
            ''
          )}
        </Row>
        <div id="input">
          <div className="field">
            <span className="input-label">Email:</span>
            <Row>
              <Col span={12}>
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.input.email}
                  onChange={this.handleInput}
                />
              </Col>
            </Row>
          </div>
          <div className="field">
            <span className="input-label">Password:</span>
            <Row>
              <Col span={12}>
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.input.password}
                  onChange={this.handleInput}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => this.props.handleSubmit(this.state.input.email, this.state.input.password)}
                >
                  Enviar
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>
                {/* https://github.com/keppelen/react-facebook-login */}
                <FacebookLogin
                  appId="667154123468908"
                  autoLoad={false}
                  callback={this.props.handleFacebookLogin}
                  fields="name,email,picture"
                  cssClass="my-facebook-button-class"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  login: state.login,
});
const mapActions = dispatch => bindActionCreators({ handleSubmit, handleFacebookLogin }, dispatch);

export default connect(
  mapState,
  mapActions,
)(Login);

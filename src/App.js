import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter, Redirect, Switch } from 'react-router-dom'; //Import modules from react-router-dom
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import './App.css';
const { Header, Content, Footer } = Layout;

class DynamicImport extends Component {
  state = {
    component: null,
  };

  componentDidMount() {
    this.props.load().then(component => {
      this.setState(() => ({
        component: component.default ? component.default : component,
      }));
    });
  }

  render() {
    return this.props.children(this.state.component);
  }
}
//Dyanmic import of Components


const Cadastro = props => (
  <DynamicImport load={() => import('./components/Fornecedores/Cadastro')}>
    {Component => (Component === null ? <div> </div> : <Component {...props} />)}
  </DynamicImport>
);


const Login = props => (
  <DynamicImport load={() => import('./components/Login')}>
    {Component => (Component === null ? <div> </div> : <Component {...props} />)}
  </DynamicImport>
);
const Portal = props => (
  <DynamicImport load={() => import('./components/Portal')}>
    {Component => (Component === null ? <div> </div> : <Component {...props} />)}
  </DynamicImport>
);
const Rappel = props => (
  <DynamicImport load={() => import('./components/Rappel')}>
    {Component => (Component === null ? <div> </div> : <Component {...props} />)}
  </DynamicImport>
);

const Logout = props => (
  <DynamicImport load={() => import('./components/Logout')}>
    {Component => (Component === null ? <div> </div> : <Component {...props} />)}
  </DynamicImport>
);

class App extends Component {
  goToPortal = () => {
    import('./components/Portal').then(mod => this.setState(() => ({ location: mod.default })));
  };

  componentDidMount() {
    this.goToPortal();
    console.log(this.props.login);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>
            { (
              <Header style={{ zIndex: 1, width: '100%', marginBottom: 10 }}>
                <NavLink to="/portal/">
                  <div className="logo">
                  <span></span>
                  </div>
                </NavLink>
                <Menu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
                  <Menu.Item key="1">
                    <NavLink to="/cadastro/">
                      <Icon type="user-add" />
                      <span>Cadastro de Fornecedor</span>
                    </NavLink>
                  </Menu.Item>
                  
                  
                  <Menu.Item key="2">
                    <NavLink to="/rappel/">
                      <Icon type="wallet" />
                      <span>Cálculo do Rappel</span>
                    </NavLink>
                  </Menu.Item>
                  
                  
                </Menu>
              </Header>
            )}
            <Content>
              <Switch>
                <Route path="/" render={() => <Redirect to="login" />} exact />
                <Route path="/portal" exact component={Portal} />
                <Route path="/rappel" exact component={Rappel} />
                <Route path="/cadastro" exact component={Cadastro} />
              </Switch>
            </Content>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapState = state => ({
  login: state.login,
});
export default connect(mapState)(App);

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ViewCard from '../../ViewCard/ViewCard.js';
import { NavLink } from 'react-router-dom';
import '../../App.css';

class Portal extends Component {
  render() {
    return (
      <div>
        <Row className="sub-content">
          <Col className="card  content-title-wrapper">
            <h3 className="content-title">Portal dos Fornecedores</h3>
          </Col>
        </Row>
        <div style={{ paddingBottom: '8%' }} />

        <div className="modules" style={{ marginLeft: 20 }}>
          <Row style={{ margin: 20 }} gutter={124}>
            <Col xs={24} lg={6} xl={6}>
              <NavLink to="/cadastro">
                <ViewCard title="Cadastro de Fornecedor" iconType="user-add" />
              </NavLink>
            </Col>

            <Col xs={24} lg={6} xl={6}>
              <NavLink to="/rappel">
                <ViewCard title="Cálculo Rappel" iconType="wallet" />
              </NavLink>
            </Col>
         
          </Row>
        </div>
      </div>
    );
  }
}

export default Portal;

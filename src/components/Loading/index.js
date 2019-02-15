import React from 'react';
import { Icon } from 'antd';
import '../../App.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="card sub-content o-hidden web-num-card" style={{ textAlign: 'center', padding: '15%' }}>
        <Icon type="loading" style={{ fontSize: '2em' }} />
      </div>
    );
  }
}

export default Loading;

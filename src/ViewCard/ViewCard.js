import React from 'react';
import { Icon } from 'antd';
import './ViewCard.css';

class ViewCard extends React.Component {
  render() {
    return (
      <div className="viewcard">
        <div className="title" />

        <div className="icon">
          <Icon type={this.props.iconType} style={{ fontSize: 64, color: 'rgb(180,180,180)' }} />
        </div>

        <h4 style={{ textAlign: 'center', paddingTop: 40, color: 'rgb(180,180,180)' }}>{this.props.title}</h4>
      </div>
    );
  }
}

export default ViewCard;
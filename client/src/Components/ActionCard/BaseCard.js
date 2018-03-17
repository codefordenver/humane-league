import React, { Component } from 'react';

class BaseCard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="ActionCard twitter-card">
        <h3>{title}</h3>
        <p className="action-description">{description}</p>
        {/* phone stuff goes here */}
        {/* email stuff goes here */}
        {textArea}
        <div className="button-holder">
          <a href={targetLink} target="_blank">
            {button}
          </a>
          {cancelButton}
        </div>
        {noMoreActions}
      </div>
    );
  }
}




export default BaseCard;
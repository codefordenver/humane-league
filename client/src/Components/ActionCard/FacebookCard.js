import React, { Component } from 'react';
import facebookLogo from '../../assets/facebook.png';
import logAction from '../../utils/logAction';

const FacebookCard = ({ action, user }) => {
  const { title, description, target } = action;

  return (
    <div className="ActionCard facebook-card">
      <div className="action-logo-holder">
        <img className="action-logo" src={facebookLogo} alt="Facebook Symbol"/>
      </div>
      <div className="action-card-main">
        <h3>{title}</h3>
        <p>{description}</p>
        <a target="_blank" href={target}>
          <button onClick={() => logAction('facebook_actions', user, action)}>CLICK TO COMMENT</button>
        </a> 
      </div>
    </div>
  );
}

export default FacebookCard;
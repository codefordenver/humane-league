import React from 'react';
import facebookLogo from '../../assets/facebook.png';


const FacebookCard = ({ type, action }) => {
  const { title, description, target } = action;

  return (
    <div className={`ActionCard ${type}-card`}>
      <div className="action-logo-holder">
        <img className="action-logo" src={facebookLogo} alt="Facebook Symbol"/>
      </div>
      <div className="action-card-main">
        <h3>{title}</h3>
        <p>{description}</p>
        <a target="_blank" href={target}>Click this link to take action!</a> 
      </div>
    </div>
  );
}

export default FacebookCard;
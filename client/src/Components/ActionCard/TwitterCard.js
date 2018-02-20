import React from 'react';
import twitterLogo from '../../assets/twitter.png';

const TwitterCard = ({ action }) => {
  const { title, description, target } = action;

  return (
    <div className="ActionCard twitter-card">
      <div className="action-logo-holder">
        <img className="action-logo" src={twitterLogo} alt="Twitter Symbol"/>
      </div>
      <div className="action-card-main">
        <h3>{title}</h3>
        <p>{description}</p>
        <a target="_blank" href={target}>
          <button>CLICK TO RE-TWEET</button>
        </a> 
      </div>
    </div>
  );
}

export default TwitterCard;
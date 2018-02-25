import React from 'react';
import twitterLogo from '../../assets/twitter.png';

const TwitterCard = ({ action, user }) => {
  const { title, description, target } = action;
  console.log(action)

  const logAction = async (actionType) => {
    const actionLogPost = await fetch(`/api/v1/actions?token=${user.id_token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        action_id: action.id,
        action_type: actionType,
        title,
        description
      })
    });

    const actionLog = await actionLogPost.json();
    console.log(actionLog);
  }

  return (
    <div className="ActionCard twitter-card">
      <div className="action-logo-holder">
        <img className="action-logo" src={twitterLogo} alt="Twitter Symbol"/>
      </div>
      <div className="action-card-main">
        <h3>{title}</h3>
        <p>{description}</p>
        <a target="_blank" href={target}>
          <button onClick={() => logAction('twitter_actions')}>CLICK TO RE-TWEET</button>
        </a> 
      </div>
    </div>
  );
}

export default TwitterCard;
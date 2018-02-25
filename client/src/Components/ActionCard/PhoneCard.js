import React from 'react';
import phoneLogo from '../../assets/phone.png';
import logAction from '../../utils/logAction';

const PhoneCard = ({ action, user }) => {
  const { title, description, phone_number } = action;

  return (
    <div className="ActionCard phone-card">
      <div className="action-logo-holder">
        <img className="action-logo" src={phoneLogo} alt="Phone Symbol"/>
      </div>
      <div className="action-card-main">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={`tel:${phone_number}`}>
          <button onClick={() => logAction('phone_actions', user, action)}>CLICK TO CALL {phone_number}</button>
        </a>
      </div> 
    </div>
  );
}

export default PhoneCard;
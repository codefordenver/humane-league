import React from 'react';
import emailLogo from '../../assets/email.png';

const EmailCard = ({ type, action }) => {
  const { title, description, to, cc, bcc, subject } = action;

  return (
    <div className={`ActionCard ${type}-card`}>
      <div className="action-logo-holder">
        <img className="action-logo" src={emailLogo} alt="Email Symbol"/>
      </div>
      <div className="action-card-main">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="email-template">
          <p><strong>To:</strong> {to}</p>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Body:</strong> {to}</p>
        </div>
        <a target="_blank" href={`mailto:${to}`}>
          <button>CLICK TO SEND THE EMAIL</button>
        </a> 
      </div>
    </div>
  );
}

export default EmailCard;
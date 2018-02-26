import React from 'react';
import emailLogo from '../../assets/email.png';
import logAction from '../../utils/logAction';

const EmailCard = ({ action, user }) => {
  const { title, description, to, cc, bcc, subject } = action;

  return (
    <div className="ActionCard email-card">
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
        <a href={`mailto:${to}?subject=${subject}`}>
          <button onClick={() => logAction('email_actions', user, action)}>CLICK TO SEND THE EMAIL</button>
        </a> 
      </div>
    </div>
  );
}

export default EmailCard;
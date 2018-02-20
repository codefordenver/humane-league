import React from 'react';

const EmailCard = ({ type, action }) => {
  const { title, description, to, cc, bcc, subject } = action;

  return (
    <div className={`ActionCard ${type}-card`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="email-template">
        <p><strong>To:</strong>{to}</p>
        <p><strong>Subject:</strong>{subject}</p>
        <p><strong>Body:</strong>{to}</p>
      </div>
      <a target="_blank" href={`mailto:${to}`}>Click here to email!</a> 
    </div>
  );
}

export default EmailCard;
import React from 'react';

const ActionCard = ({ type, action }) => {
  return (
    <div className={`action-card ${type}`}>
      <h3>{action.title}</h3>
      <p>{action.description}</p>
    </div>
  );
}

export default ActionCard;
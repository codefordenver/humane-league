import React from 'react';

const TwitterCard = ({ type, action }) => {
  const { title, description, target } = action;

  return (
    <div className={`ActionCard ${type}-card`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a target="_blank" href={target}>Click this link to take action!</a> 
    </div>
  );
}

export default TwitterCard;
import React from 'react';
import ActionContainer from '../ActionContainer/ActionContainer';
import './UserProfile.css';

const UserProfile = () => {

  return (
    <div className="UserProfile">
      <h1 className="user-welcome">Welcome, Katie</h1>
      <ActionContainer/>
    </div>
  );
  
}

export default UserProfile;
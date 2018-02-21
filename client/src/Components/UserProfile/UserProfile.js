import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="UserProfile">
      <h1>Profile for Katie Scruggs</h1>
      
      <div className="user-achievements">
        <h2>User Achievements</h2>
      </div>
      
      <div className="user-preferences">
        <h2>Action Preferences</h2>

        <form className="user-preferences-form">
          <label> Twitter Actions
            <input className="checkbox" type="checkbox" value="twitter"/>
          </label>
          <label> Facebook Actions
            <input className="checkbox" type="checkbox" value="facebook"/>
          </label>
          <label> Email Actions
            <input className="checkbox" type="checkbox" value="email"/>
          </label>
          <label> Phone Actions
            <input className="checkbox" type="checkbox" value="phone"/>
          </label>
          
          <button>SAVE</button>
        </form>

      </div>

    </div>
  )
}

export default UserProfile;
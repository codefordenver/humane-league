import React from 'react';

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
            <input type="checkbox" value="twitter"/>
          </label>
          <label> Facebook Actions
            <input type="checkbox" value="facebook"/>
          </label>
          <label> Email Actions
            <input type="checkbox" value="email"/>
          </label>
          <label> Phone Actions
            <input type="checkbox" value="phone"/>
          </label>
          
          <button>SAVE PREFERENCES</button>
        </form>

      </div>

    </div>
  )
}

export default UserProfile;
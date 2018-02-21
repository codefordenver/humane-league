import React from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';

const UserProfile = ({ user }) => {
  const { name, twitter_actions, facebook_actions, email_actions, phone_actions } = user;

  const twitter = twitter_actions ? <input className="checkbox" type="checkbox" value="twitter" checked /> : <input className="checkbox" type="checkbox" value="twitter" />;
  const facebook = facebook_actions ? <input className="checkbox" type="checkbox" value="facebook" checked /> : <input className="checkbox" type="checkbox" value="facebook"/>;
  const email = email_actions ? <input className="checkbox" type="checkbox" value="email" checked /> : <input className="checkbox" type="checkbox" value="email"/>;
  const phone = phone_actions ? <input className="checkbox" type="checkbox" value="phone" checked /> : <input className="checkbox" type="checkbox" value="phone"/>;

  const patchPreferences = () => {
    // will get values of checks and make a patch request
  };

  return (
    <div className="UserProfile">
      <h1>{`Profile for ${name}`}</h1>
      
      <div className="user-achievements">
        <h2>User Achievements</h2>
      </div>
      
      <div className="user-preferences">
        <h2>Action Preferences</h2>

        <form className="user-preferences-form">
          <label> Twitter Actions
            {twitter}
          </label>
          <label> Facebook Actions
            {facebook}
          </label>
          <label> Email Actions
            {email}
          </label>
          <label> Phone Actions
            {phone}
          </label>
          
          <button onClick={patchPreferences}>SAVE</button>
        </form>

      </div>
    </div>
  )
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(UserProfile);
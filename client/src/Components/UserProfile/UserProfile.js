import React, {Component} from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';

class UserProfile extends Component {
  constructor () {
    super();
    this.state = {
      id: 0,
      name: '',
      twitter_actions: null,
      facebook_actions: null,
      email_actions: null,
      phone_actions: null
    };
  }

  componentDidMount () {
    const { id, name, twitter_actions, facebook_actions, email_actions, phone_actions } = this.props.user;
    this.setState({ id, name, twitter_actions, facebook_actions, email_actions, phone_actions });
  }

  changeClick = (event) => {
    this.setState({ [event.target.value]: !this.state[event.target.value] });
  }

  patchPreferences = async (event) => {
    event.preventDefault();
    const { twitter_actions, facebook_actions, email_actions, phone_actions } = this.state;
    const preferencePath = await fetch(`/api/v1/users/${this.state.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ twitter_actions, facebook_actions, email_actions, phone_actions })
    });
  };

  render () {
    return (
      <div className="UserProfile">
        <h1>{`Profile for ${this.state.name}`}</h1>
        
        <div className="user-achievements">
          <h2>User Achievements</h2>
        </div>
        
        <div className="user-preferences">
          <h2>Action Preferences</h2>

          <form className="user-preferences-form">
            <label> Twitter Actions
              <input className="checkbox" type="checkbox" value="twitter_actions" checked={this.state.twitter_actions} onChange={this.changeClick}/>
            </label>
            <label> Facebook Actions
              <input className="checkbox" type="checkbox" value="facebook_actions" checked={this.state.facebook_actions} onChange={this.changeClick}/>
            </label>
            <label> Email Actions
              <input className="checkbox" type="checkbox" value="email_actions" checked={this.state.email_actions} onChange={this.changeClick}/>
            </label>
            <label> Phone Actions
              <input className="checkbox" type="checkbox" value="phone_actions" checked={this.state.phone_actions} onChange={this.changeClick}/>
            </label>
            
            <button onClick={this.patchPreferences}>SAVE</button>
          </form>

        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(UserProfile);
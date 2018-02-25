import React, {Component} from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';

class UserProfile extends Component {
  constructor () {
    super();
    this.state = {
      actionCount: null,
      twitter_actions: null,
      facebook_actions: null,
      email_actions: null,
      phone_actions: null
    };
  }

  async componentDidMount () {
    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();

    const userActions = actionLog.results.filter(action => action.user_id === this.props.user.id);
    this.setState({ actionCount: userActions.length });

    const { twitter_actions, facebook_actions, email_actions, phone_actions } = this.props.user;
    this.setState({ twitter_actions, facebook_actions, email_actions, phone_actions });
  }

  changeClick = (event) => {
    this.setState({ [event.target.value]: !this.state[event.target.value] });
  }

  patchPreferences = async (event) => {
    event.preventDefault();
    const preferencePath = await fetch(`/api/v1/users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...this.state })
    });
  };

  render () {
    return (
      <div className="UserProfile">
        <h1>{`Profile for ${this.props.user.name}`}</h1>
        
        <div className="user-achievements">
          <h2>User Achievements</h2>
          <p>{`You have completed ${this.state.actionCount} actions! Great job!`}</p>
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
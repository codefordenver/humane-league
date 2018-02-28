/* eslint-disable max-len */
/* eslint-disable no-undef */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './UserProfile.css';
import * as actions from '../../Actions';
import { getActionLog, patchPreferences } from '../../utils/apiCalls';

export class UserProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: props.user.name,
      email: props.user.email,
      actionCount: true,
      twitter_actions: true,
      facebook_actions: true,
      email_actions: true,
      phone_actions: true
    };
  }

  async componentDidMount () {
    const actionLog = await getActionLog();

    const userActions = actionLog.results.filter(action => action.user_id === this.props.user.id);
    this.setState({ actionCount: userActions.length });

    const { twitter_actions, facebook_actions, email_actions, phone_actions } = this.props.user;
    this.setState({ twitter_actions, facebook_actions, email_actions, phone_actions });
  }

  changeClick = (event) => {
    this.setState({ [event.target.value]: !this.state[event.target.value] });
  }

  patchPreferences = async (event, param) => {
    event.preventDefault();
    const { 
      name, 
      email, 
      twitter_actions, 
      facebook_actions, 
      email_actions, 
      phone_actions } = this.state;
    const updates = param === 'prefs' ? 
      {twitter_actions, facebook_actions, email_actions, phone_actions} :
      {name, email};

    const preferencePath = await patchPreferences(
      this.props.user.id, this.props.user.id_token, updates);

    if (preferencePath.status === 204) {
      this.updateLocal(updates);
      this.props.updatePrefs(updates);
    }
  };

  updateLocal = (updates) => {
    const { user } = JSON.parse(localStorage.getItem('THL-FAN-USER'));
    const updatedUser = Object.assign({}, user, updates);

    localStorage.setItem('THL-FAN-USER', JSON.stringify({ user: updatedUser }));
  }

  render () {
    return (
      <div className="UserProfile">
        <h1>{`Welcome, ${this.props.user.name.split(' ')[0]}`}</h1>
        <p className="action-count-description">{`You have completed ${this.state.actionCount} actions so far!`}</p>
        
        <div className="user-preferences">
          <h2>Your Preferences</h2>

          <form className="user-preferences-form">
            <label> Twitter Actions
              <input 
                className="checkbox" 
                type="checkbox" 
                value="twitter_actions" 
                checked={this.state.twitter_actions} 
                onChange={this.changeClick}/>
            </label>
            <label> Facebook Actions
              <input 
                className="checkbox" 
                type="checkbox" 
                value="facebook_actions" 
                checked={this.state.facebook_actions} 
                onChange={this.changeClick}/>
            </label>
            <label> Email Actions
              <input 
                className="checkbox" 
                type="checkbox" 
                value="email_actions" 
                checked={this.state.email_actions} 
                onChange={this.changeClick}/>
            </label>
            <label> Phone Actions
              <input 
                className="checkbox" 
                type="checkbox" 
                value="phone_actions" 
                checked={this.state.phone_actions} 
                onChange={this.changeClick}/>
            </label>
            
            <button onClick={(event) => this.patchPreferences(event, 'prefs')}>SAVE</button>
          </form>
        </div>

        <div className="user-profile-edit">
          <h2>Your Profile</h2>

          <form className="user-profile-form">
            <label> Name: 
              <input 
                className="text-input"  
                onChange={(event) => this.setState({name: event.target.value})} 
                value={this.state.name} />
            </label>
            <label> Email: 
              <input 
                className="text-input" 
                onChange={(event) => this.setState({email: event.target.value})} 
                value={this.state.email} />
            </label>

            <button onClick={(event) => this.patchPreferences(event, 'name')}>SAVE</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

const mapDispatchToProps = dispatch => ({
  updatePrefs: newPrefs => dispatch(actions.updatePrefs(newPrefs))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

UserProfile.propTypes = {
  user: PropTypes.object,
  updatePrefs: PropTypes.func
};
/* eslint-disable no-undef */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TwitterCard from '../ActionCard/TwitterCard';
import FacebookCard from '../ActionCard/FacebookCard';
import EmailCard from '../ActionCard/EmailCard';
import PhoneCard from '../ActionCard/PhoneCard';
import './ActionContainer.css';
import '../ActionCard/ActionCard.css';
import { 
  getTwitterActions, 
  getFacebookActions, 
  getEmailActions, 
  getPhoneActions,
  getCompletedActions } from '../../utils/apiCalls';

export class ActionContainer extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userPreferences: {},
      twitter_actions: [],
      facebook_actions: [],
      email_actions: [],
      phone_actions: []
    };
  }
  async componentDidMount() {
    const { twitter_actions, facebook_actions, email_actions, phone_actions, id, id_token} = this.props.user;
    await this.setState({ userPreferences: { twitter_actions, facebook_actions, email_actions, phone_actions} });

    const completedActions = await getCompletedActions(id, id_token);
    const actions = {
      twitter_actions: this.state.userPreferences.twitter_actions ? 
        await getTwitterActions() : [],
      facebook_actions: this.state.userPreferences.facebook_actions ?
        await getFacebookActions() : [],
      email_actions: this.state.userPreferences.email_actions ? 
        await getEmailActions() : [],
      phone_actions: this.state.userPreferences.phone_actions ?
        await getPhoneActions() : []
    };

    completedActions.forEach( action => {
      actions[action.action_type] = actions[action.action_type].filter(act => act.id != action.action_id);
    });

    Object.keys(actions).forEach(actionType => {
      actions[actionType] = actions[actionType].filter(action => action.enabled === true);
      actions[actionType].sort((a, b) => a.created_at > b.created_at);
    });
    console.log(this.state);
    await this.setState(Object.assign(actions, { loading: false }));
    console.log(this.state);
  }

  removeCompleted = (actionType, action) => {
    const index = this.state[actionType].indexOf(action);
    const actions = this.state[actionType];
    actions[index] = { id: action.id, completed: true, title: 'Thank You!', description: `🎉  For taking action: ${action.title}  🎉`};
    setTimeout(() => this.setState({ [actionType]: actions }), 1000);
  }

  render() {
    const { twitter_actions, facebook_actions, email_actions, phone_actions } = this.state;
    const { user } = this.props;

    const twitter = twitter_actions.length ? <TwitterCard action={twitter_actions[0]} user={user} removeCompleted={this.removeCompleted}/> : null;
    const facebook = facebook_actions.length ? <FacebookCard action={facebook_actions[0]} user={user} removeCompleted={this.removeCompleted}/> : null;
    const email = email_actions.length ? <EmailCard action={email_actions[0]} user={user} removeCompleted={this.removeCompleted}/> : null;
    const phone = phone_actions.length ? <PhoneCard action={phone_actions[0]} user={user} removeCompleted={this.removeCompleted}/> : null;

    const noActions = twitter_actions.length === 0 && facebook_actions.length === 0 && email_actions.length === 0 && phone_actions.length === 0 && !this.state.loading;
    const noActionsMessage = noActions ? <div className="no-actions"><p>You have completed all of our actions!</p><p>🎉  Great job!  🎉</p><p> Please check back again soon for new actions. In the meantime, check out <a className="thl-twitter-link" href="https://twitter.com/thehumaneleague" target="_blank">our Twitter feed</a> to see what we're up to.</p></div> : null;
    const loadingMessage = this.state.loading ? <p className="no-actions">Loading...</p> : null;


    return (
      <div className="ActionContainer">
        <h1>FAN ACTION ALERTS</h1>
        {twitter}
        {facebook}
        {email}
        {phone}
        {loadingMessage}
        {noActionsMessage}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(ActionContainer);

ActionContainer.propTypes = {
  user: PropTypes.object
};

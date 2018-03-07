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
      userPreferences: {},
      twitter: [],
      facebook: [],
      email: [],
      phone: []
    };
  }
  async componentDidMount() {
    const { twitter_actions, facebook_actions, email_actions, phone_actions, id, id_token} = this.props.user;
    await this.setState({ userPreferences: { twitter_actions, facebook_actions, email_actions, phone_actions} });

    const completedActions = await getCompletedActions(id, id_token);
    const actions = {
      twitter: this.state.userPreferences.twitter_actions ? 
        await getTwitterActions() : [],
      facebook: this.state.userPreferences.facebook_actions ?
        await getFacebookActions() : [],
      email: this.state.userPreferences.email_actions ? 
        await getEmailActions() : [],
      phone: this.state.userPreferences.phone_actions ?
        await getPhoneActions() : []
    };

    completedActions.forEach( action => {
      const actionTypes = {
        twitter_actions: 'twitter',
        facebook_actions: 'facebook',
        email_actions: 'email',
        phone_actions: 'phone'
      };
      const type = actionTypes[action.action_type];

      actions[type] = actions[type].filter(act => act.id != action.action_id);
    });

    actions.twitter = actions.twitter.filter(action => action.enabled === true);
    actions.facebook = actions.facebook.filter(action => action.enabled === true);
    actions.email = actions.email.filter(action => action.enabled === true);
    actions.phone = actions.phone.filter(action => action.enabled === true);
    
    await this.setState(actions);
  }

  removeCompleted = (actionType, action) => {
    const index = this.state[actionType].indexOf(action);
    const actions = this.state[actionType];
    actions[index] = { id: action.id, completed: true, title: 'Thank You!', description: `For taking action: ${action.title}`};
    setTimeout(() => this.setState({ [actionType]: actions }), 1000);
  }

  render() {
    const { twitter, facebook, email, phone } = this.state;

    const twitterCards = twitter.map((action, i) => <TwitterCard key={`twitter-${i}`} action={action} user={this.props.user} removeCompleted={this.removeCompleted}/>);
    const facebookCards = facebook.map((action, i) => <FacebookCard key={`facebook-${i}`} action={action} user={this.props.user} removeCompleted={this.removeCompleted}/>);
    const emailCards = email.map((action, i) => <EmailCard key={`email-${i}`} action={action} user={this.props.user} removeCompleted={this.removeCompleted}/>);
    const phoneCards = phone.map((action, i) => <PhoneCard key={`phone-${i}`} action={action} user={this.props.user} removeCompleted={this.removeCompleted}/>);

    const noActions = twitter.length === 0 && facebook.length === 0 && email.length === 0 && phone.length === 0;
    const noActionsMessage = noActions ? <p className="no-actions">There are no actions to take at this time. Please check back again soon!</p> : null;

    return (
      <div className="ActionContainer">
        <h1>FAN ACTION ALERTS</h1>
        {twitterCards}
        {facebookCards}
        {emailCards}
        {phoneCards}
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

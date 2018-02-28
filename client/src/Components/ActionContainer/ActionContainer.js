import React, { Component } from 'react';
import TwitterCard from '../ActionCard/TwitterCard';
import FacebookCard from '../ActionCard/FacebookCard';
import EmailCard from '../ActionCard/EmailCard';
import PhoneCard from '../ActionCard/PhoneCard';
import './ActionContainer.css';
import '../ActionCard/ActionCard.css';
import { connect } from 'react-redux';
import { 
  getTwitterActions, 
  getFacebookActions, 
  getEmailActions, 
  getPhoneActions,
  getCompletedActions } from '../../utils/apiCalls';
import { get } from 'https';


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
    
    await this.setState(actions);
  };

  render() {
    const twitterCards = this.state.twitter.map((action, i) => <TwitterCard key={`twitter-${i}`} action={action} user={this.props.user}/>);
    const facebookCards = this.state.facebook.map((action, i) => <FacebookCard key={`facebook-${i}`} action={action} user={this.props.user}/>);
    const emailCards = this.state.email.map((action, i) => <EmailCard key={`email-${i}`} action={action} user={this.props.user}/>);
    const phoneCards = this.state.phone.map((action, i) => <PhoneCard key={`phone-${i}`} action={action} user={this.props.user}/>);

    return (
      <div className="ActionContainer">
        <h1>FAN ACTION ALERTS</h1>
        {twitterCards}
        {facebookCards}
        {emailCards}
        {phoneCards}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(ActionContainer);

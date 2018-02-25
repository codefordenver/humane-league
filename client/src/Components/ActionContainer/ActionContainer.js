import React, { Component } from 'react';
import TwitterCard from '../ActionCard/TwitterCard';
import FacebookCard from '../ActionCard/FacebookCard';
import EmailCard from '../ActionCard/EmailCard';
import PhoneCard from '../ActionCard/PhoneCard';
import './ActionContainer.css';
import '../ActionCard/ActionCard.css';
import { connect } from 'react-redux';

class ActionContainer extends Component {
  constructor() {
    super();
    this.state = {
      userPreferences: {},
      twitter: [],
      facebook: [],
      email: [],
      phone: []
    }
  }
  async componentDidMount() {
    const { twitter_actions, facebook_actions, email_actions, phone_actions} = this.props.user;
    await this.setState({ userPreferences: { twitter_actions, facebook_actions, email_actions, phone_actions} });

    let twitter = [];
    let facebook = [];
    let email = [];
    let phone = [];

    if (this.state.userPreferences.twitter_actions) {
      const twitterFetch = await fetch('/api/v1/twitter_actions');
      const twitterActions = await twitterFetch.json();
      twitter = twitterActions.results;
    }

    if (this.state.userPreferences.facebook_actions) {
      const facebookFetch = await fetch('/api/v1/facebook_actions');
      const facebookActions = await facebookFetch.json();
      facebook = facebookActions.results;
    }

    if (this.state.userPreferences.email_actions) {
      const emailFetch = await fetch('/api/v1/email_actions');
      const emailActions = await emailFetch.json();
      email = emailActions.results;
    }

    if (this.state.userPreferences.phone_actions) {
      const phoneFetch = await fetch('/api/v1/phone_actions');
      const phoneActions = await phoneFetch.json();
      phone = phoneActions.results;
    }

    await this.setState({ twitter, facebook, email, phone });
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

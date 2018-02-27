import React, {Component} from 'react';
import TwitterCard from '../ActionCard/TwitterCard';
import FacebookCard from '../ActionCard/FacebookCard';
import EmailCard from '../ActionCard/EmailCard';
import PhoneCard from '../ActionCard/PhoneCard';
import '../ActionContainer/ActionContainer.css';
import '../ActionCard/ActionCard.css';
import { connect } from 'react-redux';

class AdminActions extends Component {
  constructor() {
    super();
    this.state = {
      twitter: [],
      facebook: [],
      email: [],
      phone: []
    };
  }

  async componentDidMount() {
    const actions = await this.makeFetches();
  };
  
  makeFetches = async () => {
    const twitterFetch = await fetch('/api/v1/twitter_actions');
    const twitterActions = await twitterFetch.json();
    const twitter = twitterActions.results;

    const facebookFetch = await fetch('/api/v1/facebook_actions');
    const facebookActions = await facebookFetch.json();
    const facebook = facebookActions.results;

    const emailFetch = await fetch('/api/v1/email_actions');
    const emailActions = await emailFetch.json();
    const email = emailActions.results;

    const phoneFetch = await fetch('/api/v1/phone_actions');
    const phoneActions = await phoneFetch.json();
    const phone = phoneActions.results;

    await this.setState({twitter, facebook, email, phone});
  };

  render () {
    const { twitter, facebook, email, phone } = this.state; 
    const twitterCards = twitter.map((action, i) => <TwitterCard key={`twitter-${i}`} action={action} user={this.props.user} admin={true} />);
    const facebookCards = facebook.map((action, i) => <FacebookCard key={`facebook-${i}`} action={action} user={this.props.user} admin={true}/>);
    const emailCards = email.map((action, i) => <EmailCard key={`email-${i}`} action={action} user={this.props.user} admin={true}/>);
    const phoneCards = phone.map((action, i) => <PhoneCard key={`phone-${i}`} action={action} user={this.props.user} admin={true}/>);

    return (
      <div className="AdminActions">
        <h1>ALL FAN ACTIONS</h1>
        {twitterCards}
        {facebookCards}
        {emailCards}
        {phoneCards}
      </div>
    );
  }
};

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(AdminActions);
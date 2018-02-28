import React, { Component } from 'react';
import { getActionLog } from '../../utils/apiCalls.js';
// import './ActionLog.css';

class ActionLog extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  async componentDidMount () {
    const actionLogResults = await getActionLog();
    const all = actionLogResults.results;

    const twitter = all.filter(action => action.action_type === 'twitter_actions');
    const facebook = all.filter(action => action.action_type === 'facebook_actions');
    const email = all.filter(action => action.action_type === 'email_actions');
    const phone = all.filter(action => action.action_type === 'phone_actions');

    const users = all.reduce((users, action) => {
      if (!users[action.user_id]) {
        users['total']++;
      }
      users[action.user_id]= true;
      return users;
    }, {total: 0});

    const userCount = users.total;

    this.setState({ all, twitter, facebook, email, phone, userCount });
  }

  render () {
    const { all, twitter, facebook, email, phone } = this.state;
    if (all) {
      return (
        <div className="action-log">
          <h1>Action Log</h1>
          <div className="total-counts">
            <p>{`${all.length} total actions`}</p>
            <p>{`${twitter.length} twitter actions`}</p>
            <p>{`${facebook.length} facebook actions`}</p>
            <p>{`${email.length} email actions`}</p>
            <p>{`${phone.length} phone actions`}</p>
          </div>
        </div>
      ); 
    } else {
      return null;
    }
  }
}

export default ActionLog;
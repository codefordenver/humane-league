import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getActionLog } from '../../utils/apiCalls';
import './ActionLog.css';

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
    const { all, twitter, facebook, email, phone, userCount } = this.state;
    if (all) {
      return (
        <div className="action-log">
          <h1>Action Log</h1>
          <div className="total-counts">
            <p className="total-actions action-log-p">
              <strong>{all.length} </strong>
              TOTAL ACTIONS
            </p>
            <p className="twitter-actions action-log-p specific-count">
              <strong>{twitter.length} </strong>
              <i className="icon-twitter"></i> actions
            </p>
            <p className="facebook-actions action-log-p specific-count">
              <strong>{facebook.length} </strong>
              <i className="icon-facebook"></i> actions
            </p>
            <p className="email-actions action-log-p specific-count">
              <strong>{email.length} </strong>
              <i className="icon-mail"></i> actions
            </p>
            <p className="phone-actions action-log-p specific-count">
              <strong>{phone.length} </strong>
              <i className="icon-phone"></i> actions
            </p>
            <p className="action-log-p">   
              BY <strong>{userCount} </strong> USERS
            </p>
            <Link to="/admin/actions" ><button className="view-actions-btn">VIEW ALL ACTIONS</button></Link>
          </div>
        </div>
      ); 
    } else {
      return null;
    }
  }
}

export default ActionLog;
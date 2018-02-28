/* eslint-disable no-undef */

import React, { Component } from 'react';
import './UserFeedback.css';
import { getActionLog } from '../../utils/apiCalls';

class UserFeedback extends Component {
  constructor () {
    super();
    this.state = {};
  }

  async componentDidMount () {
    const actionLog = await getActionLog();
    const actionsWithFeedback = actionLog.results.filter(action => action.description !== null);
    const feedback = actionsWithFeedback.reduce((feedback, action) => {
      if (!feedback[action.action_title]) {
        feedback[action.action_title] = {type: action.action_type, feedback: []};
      }

      feedback[action.action_title].feedback.push(action.description);
      return feedback;
    }, {});

    this.setState({ feedback });
  }

  feedbackParagraphs = (feedback) => {
    return feedback.map((feedback, ind) => <p key={`feedback${ind}`}>{feedback}</p>);
  }
  
  render () {
    const iconClasses = {
      twitter_actions: 'twitter',
      facebook_actions: 'facebook',
      email_actions: 'mail',
      phone_actions: 'phone'
    };

    if (this.state.feedback) {
      const { feedback } = this.state;
      const cards = Object.keys(feedback).map((actionTitle, ind) => {
        const iconClass = iconClasses[feedback[actionTitle].type];
        return (
          <div className="feedback-card" key={`feedback${ind}`}>
            <h3>
              {actionTitle}
              <i className={`icon-${iconClass}`}></i>
            </h3>
            {this.feedbackParagraphs(feedback[actionTitle].feedback)}
          </div>
        );
      });

      return (
        <div className="UserFeedback">
          <h1>User Feedback</h1>
          {cards}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default UserFeedback;


// {action_title: 'blah', action_id: 4, feedback: ['aldkf', 'adlkf', 'asldfkj']}
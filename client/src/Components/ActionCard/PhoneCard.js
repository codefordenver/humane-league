/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';

class PhoneCard extends Component {
  constructor () {
    super();
    this.state = {
      actionBody: null
    };
    this.fetchActionBody = fetchActionBody.bind(this);
  }

  componentDidMount () {
    if (this.props.user.admin) {
      this.actionCount();
    }
  }

  setActionBody = async (event) => {
    event.preventDefault();
    let actionBody;
    if (this.props.user.preview) {
      actionBody = this.props.action.content;
    } else {
      actionBody = await this.fetchActionBody('phone_contents', this.props.action);
    }
    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  actionCount = async () => {
    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();
    const actionCount = actionLog.results.filter(actionLog => (actionLog.action_id === this.props.action.id && actionLog.action_type === 'phone_actions')).length;
    await this.setState({ actionCount });
  }

  completeAction = () => {
    this.props.removeCompleted('phone_actions', this.props.action);
    logAction('phone_actions', this.props.user, this.props.action);
  }

  render () {
    const { title, description, phone_number } = this.props.action;

    let buttonText = 'CALL';
    let noMoreActions = null;

    if (this.props.user.admin) {
      buttonText = `${this.state.actionCount} people have taken this action!`;
    }
    
    let buttonOnClick = this.setActionBody;
    let phoneNumber = null;
    let textArea = null;
    let cancelButton = null;
    let button = <button onClick={ buttonOnClick }>{buttonText}<i className="icon-phone"></i></button>;
    let script = null;

    if (this.state.actionBody !== null && !this.props.action.completed) {
      buttonText = 'COMPLETED!';
      buttonOnClick = this.completeAction;
      phoneNumber = <p className="phone-number">{`Call ${phone_number}, and then click completed!`}</p>;
      textArea = <textarea className="body-text feedback-textarea" placeholder="How did this call go for you? Please leave your feedback here!" ref={(input) => this.feedbackTextArea = input }></textarea>;
      cancelButton = <button onClick={() => this.resetBody(null)}>CANCEL</button>;
      script = <textarea className="script body-text" onChange={(event) => this.resetBody(event.target.value)} value={this.state.actionBody}></textarea>;
      button = <button onClick={ buttonOnClick }>{buttonText}<i className="icon-phone"></i></button>;
    }
    
    if (this.props.action.completed && this.props.length >= 1) {
      buttonText = "Next Phone Action";
      buttonOnClick = () => this.props.removeCompleted('phone_actions', this.props.action);
      button = <button onClick={buttonOnClick}>{buttonText}<i className="icon-phone"></i></button>;
    }

    if (this.props.action.completed && this.props.length <= 1) {
      button = null;
      noMoreActions = <p className="no-more-actions">No More Phone Actions Today</p>;
    }

    return (
      <div className="ActionCard phone-card">
        <h3>{title}</h3>
        <p className="action-description">{description}</p>

        {phoneNumber}
        {script}

        {textArea}
        <div className="button-holder">
          {button}
          {cancelButton}
        </div>
        {noMoreActions}
      </div>
    );
  }
}

export default PhoneCard;

PhoneCard.propTypes = {
  user: PropTypes.object,
  action: PropTypes.object,
  removeCompleted: PropTypes.func  
};
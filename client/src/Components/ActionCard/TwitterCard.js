/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';

class TwitterCard extends Component {
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
      actionBody = await this.fetchActionBody('twitter_contents', this.props.action);
    }

    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    await this.setState({ actionBody: newBody });
  }

  actionCount = async () => {
    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();
    const actionCount = actionLog.results.filter(actionLog => (actionLog.action_id === this.props.action.id && actionLog.action_type === 'twitter_actions')).length;
    await this.setState({ actionCount });
  }

  completeAction = () => {
    this.props.removeCompleted('twitter_actions', this.props.action);
    logAction('twitter_actions', this.props.user, this.props.action);
  }

  render() {
    const { title, description, target } = this.props.action;

    let buttonText = 'TWEET';
    let buttonOnClick = this.setActionBody;
    let targetLink = null;
    let cancelButton = null;
    let textArea = null;
    let button = <button onClick={ buttonOnClick }>{buttonText}<i className="icon-twitter"></i></button>;

    if (this.state.actionBody !== null && !this.props.action.completed) {
      buttonText = 'GO';
      buttonOnClick = this.completeAction;
      targetLink = `https://twitter.com/intent/tweet?text=${target} ${this.state.actionBody}`;
      cancelButton = <button onClick={() => this.resetBody(null)}>CANCEL</button>;
      textArea = <textarea className="body-text" onChange={(event) => this.resetBody(event.target.value)} value={this.state.actionBody}></textarea>;      
      button = <button onClick={ buttonOnClick }>{buttonText}<i className="icon-twitter"></i></button>;  
    }

    if (this.props.action.completed) {
      button = null;
    }

    if (this.props.user.admin) {
      buttonText = `${this.state.actionCount} people have taken this action!`;
    }

    return (
      <div className="ActionCard twitter-card">
        <h3>{title}</h3>
        <p className="action-description">{description}</p>
        {textArea}

        <div className="button-holder">
          <a href={targetLink} target="_blank">
            {button}
          </a>
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default TwitterCard;

TwitterCard.propTypes = {
  user: PropTypes.object,
  action: PropTypes.object,
  removeCompleted: PropTypes.func
};
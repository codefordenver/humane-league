/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';

class FacebookCard extends Component {
  constructor() {
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

  setActionBody = async () => {
    const actionBody = await this.fetchActionBody('facebook_contents', this.props.action);
    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  actionCount = async () => {
    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();
    const actionCount = actionLog.results.filter(actionLog => (actionLog.action_id === this.props.action.id && actionLog.action_type === 'facebook_actions')).length;
    await this.setState({ actionCount });
  }

  render() {
    const { title, description, target } = this.props.action;
    const expanded = this.state.actionBody !== null;

    let buttonText = expanded ? 'GO' : 'FACEBOOK';
    const buttonOnClick = expanded ? () => logAction('facebook_actions', this.props.user, this.props.action) : this.setActionBody;
    const targetLink = expanded ? target : null;
    const cancelButton = expanded ? <button onClick={() => this.resetBody(null)}>CANCEL</button>: null;
    const textArea = expanded ? <textarea className="body-text" onChange={(event) => this.resetBody(event.target.value)} value={this.state.actionBody}></textarea> : null;
    
    if (this.props.user.admin) {
      buttonText = `${this.state.actionCount} people have taken this action!`;
    }

    return (
      <div className="ActionCard facebook-card">
        <h3>{title}</h3>
        <p className="action-description">{description}</p>

        {textArea}

        <div className="button-holder">
          <a target="_blank" href={targetLink}>
            <button onClick={buttonOnClick}>{buttonText}<i className="icon-facebook"></i></button>
          </a> 
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default FacebookCard;

FacebookCard.propTypes = {
  user: PropTypes.object,
  action: PropTypes.object  
};
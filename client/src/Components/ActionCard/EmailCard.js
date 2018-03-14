/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';
import Clipboard from '../../Clipboard.png';

class EmailCard extends Component {
  constructor () {
    super();
    this.state = {
      actionBody: null,
      copyText: 'Copy',      
      showContent: false
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
      actionBody = await this.fetchActionBody('email_contents', this.props.action);
    }

    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  completeAction = () => {
    this.props.removeCompleted('email_actions', this.props.action);
    logAction('email_actions', this.props.user, this.props.action);
  }

  actionCount = async () => {
    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();
    const actionCount = actionLog.results.filter(actionLog => (actionLog.action_id === this.props.action.id && actionLog.action_type === 'email_actions')).length;
    await this.setState({ actionCount });
  }

  copyText = () => {
    this.textarea.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    this.setState({ copyText: 'Copied Text ✓'});

    return setTimeout(() => {
      this.setState({ copyText: 'Copy'});
    }, 1000);
  }

  render () {
    const { title, description, to, cc, bcc, subject } = this.props.action;

    let buttonText = 'EMAIL';
    let noMoreActions = null;
        
    if (this.props.user.admin) {
      buttonText = `${this.state.actionCount} people have taken this action!`;
    }
    
    let buttonOnClick = this.setActionBody;
    let targetLink = null;
    let cancelButton = null;
    let showContentButton = null;
    let textArea = null;
    let button = <button onClick={ buttonOnClick }>{buttonText}<i className="icon-mail"></i></button>;
    let emailContent = null;

    if (this.state.actionBody !== null && !this.props.action.completed) {
      buttonText = 'SEND';
      buttonOnClick = this.completeAction;
      targetLink = `mailto:${to}?subject=${subject}&body=${this.state.actionBody}`;
      cancelButton = <button onClick={() => this.resetBody(null)}>CANCEL</button>;
      showContentButton = <button onClick={() => this.setState({ showContent: !this.state.showContent })}>VIEW EMAIL DETAILS</button>;
      textArea = <div className="bTextContainer">
        <textarea
          className="body-text" 
          onChange={(event) => this.resetBody(event.target.value)} 
          ref={(textarea => this.textarea = textarea)}
          value={this.state.actionBody}></textarea>
        <div onClick={this.copyText} className="copySection"><img onDragStart={(event) => event.preventDefault()} src={Clipboard} alt="copy"/><span className="copy">{this.state.copyText}</span></div>
      </div>;
      button = <button onClick={ buttonOnClick }>{buttonText}<i className="icon-mail"></i></button>;
    }

    if (this.state.showContent) {
      emailContent = 
        <div className="email-template">
          <p><strong>To:</strong> {to}</p>
          <p><strong>Subject:</strong> {subject}</p>
        </div>;
    }

    if (this.props.action.completed && this.props.length >= 1) {
      buttonText = "Next Email Action";
      buttonOnClick = () => this.props.removeCompleted('email_actions', this.props.action);
      button = <button onClick={buttonOnClick}>{buttonText}<i className="icon-email"></i></button>;
      targetLink = null;
    }

    if (this.props.action.completed && this.props.length <= 1) {
      button = null;
      noMoreActions = <p className="no-more-actions">No More Email Actions Today</p>;
    }

    return (
      <div className="ActionCard email-card">
        <h3>{title}</h3>
        <p className="action-description">{description}</p>
        
        {showContentButton}
        {emailContent}
        {textArea}

        <div className="button-holder">
          <a href={targetLink}>
            {button}
          </a> 
          {cancelButton}
        </div>
        {noMoreActions}
      </div>
    );
  }
}

export default EmailCard;

EmailCard.propTypes = {
  user: PropTypes.object,
  action: PropTypes.object,
  removeCompleted: PropTypes.func,
  length: PropTypes.number  
};
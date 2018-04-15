import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from '../../Clipboard.png';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';

class BaseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionBody: null,
      copyText: 'Copy'
    };
    this.fetchActionBody = fetchActionBody.bind(this);
    this.cardSpecificInformation = {
      twitter: {
        icon: "icon-twitter",
        buttonText: "TWEET",
        takeActionText: "GO",
        cardType: "twitter-card",
        actionTable: "twitter_actions",
        contentsTable: "twitter_contents",
        target: props.action.target
      },
      facebook: {
        icon: "icon-facebook",
        buttonText: "FACEBOOK",
        takeActionText: "GO",
        cardType: "facebook-card",
        actionTable: "facebook_actions",
        contentsTable: "facebook_contents",
        target: props.action.target        
      },
      email: {
        icon: "icon-mail",
        buttonText: "EMAIL",
        takeActionText: "SEND",
        cardType: "email-card",
        actionTable: "email_actions",
        contentsTable: "email_contents",
        target: props.action.target
      },
      phone: {
        icon: "icon-phone",
        buttonText: "CALL",
        takeActionText: "COMPLETED",
        cardType: "phone-card",
        actionTable: "phone_actions",
        contentsTable: "phone_contents",
        target: props.action.target
      }
    };
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

  completeAction = () => {
    this.props.removeCompleted('twitter_actions', this.props.action);
    logAction('twitter_actions', this.props.user, this.props.action);
  }

  conditionalCardRendering () {
    const { title, description, target } = this.props.action;
    let { buttonText, takeActionText, icon, actionTable, targetLink }  = this.cardSpecificInformation[this.props.actionType];

    let noMoreActions = null;

    if (this.props.user.admin) {
      buttonText = `${this.state.actionCount} people have taken this action!`;
    }

    let buttonOnClick = this.setActionBody;
    let cancelButton = null;
    let textArea = null;
    let button = <button onClick={ buttonOnClick }>{buttonText}<i className={icon}></i></button>;

    if (this.state.actionBody !== null && !this.props.action.completed) {
      buttonText = takeActionText;
      buttonOnClick = this.completeAction;
      targetLink = target;
      cancelButton = <button onClick={() => this.resetBody(null)}>CANCEL</button>;
      textArea = <div className="bTextContainer">
        <textarea
          className="body-text" 
          onChange={(event) => this.resetBody(event.target.value)} 
          ref={(textarea => this.textarea = textarea)}
          value={this.state.actionBody}></textarea>
        <div onClick={this.copyText} className="copySection"><img onDragStart={(event) => event.preventDefault()} src={Clipboard} alt="copy"/><span className="copy">{this.state.copyText}</span></div>
      </div>;
      button = <button onClick={ buttonOnClick }>{buttonText}<i className={icon}></i></button>;  
    }

    if (this.props.action.completed && this.props.length >= 1) {
      buttonText = "Next Twitter Action";
      buttonOnClick = () => this.props.removeCompleted(actionTable, this.props.action);
      button = <button onClick={buttonOnClick}>{buttonText}<i className={icon}></i></button>;
      targetLink = null;
    }

    if (this.props.action.completed && this.props.length <= 1) {
      button = null;
      noMoreActions = <p className="no-more-actions">No More Twitter Actions Today</p>;
    }

    return {title, description, textArea, targetLink, button, cancelButton, noMoreActions };
  }

  componentDidMount () {
    if (this.props.user.admin) {
      this.actionCount();
    }
  }

  setActionBody = async (event) => {
    event.preventDefault();
    const { contentsTable } = this.cardSpecificInformation[this.props.actionType];
    let actionBody;
    if (this.props.user.preview) {
      actionBody = this.props.action.content;
    } else {
      actionBody = await this.fetchActionBody(contentsTable, this.props.action);
    }
    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  actionCount = async () => {
    const { actionsTable } = this.props;    
    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();
    const actionCount = actionLog.results.filter(actionLog => (actionLog.action_id === this.props.action.id && actionLog.action_type === actionsTable)).length;
    await this.setState({ actionCount });
  }

  completeAction = () => {
    const { actionTable } = this.props;    
    this.props.removeCompleted(actionTable, this.props.action);
    logAction(actionTable, this.props.user, this.props.action);
  }

  render() {
    const {title, description, textArea, targetLink, button, cancelButton, noMoreActions } = this.conditionalCardRendering();
    console.log(this.props.action);

    return (
      <div className={`ActionCard ${this.cardSpecificInformation[this.props.actionType].cardType}`}>
        <h3>{title}</h3>
        <p className="action-description">{description}</p>
        {this.props.cardSpecific}
        {/* phone stuff goes here */}
        {/* email stuff goes here */}
        {textArea}
        <div className="button-holder">
          <a href={targetLink} target="_blank">
            {button}
          </a>
          {cancelButton}
        </div>
        {noMoreActions}
      </div>
    );
  }
}




export default BaseCard;

BaseCard.propTypes = {
  cardSpecific: PropTypes.object,
  cardType: PropTypes.string,
  user: PropTypes.object,
  action: PropTypes.object,
  removeCompleted: PropTypes.func,
  length: PropTypes.number
};
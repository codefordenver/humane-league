import React, { Component } from 'react';
import phoneLogo from '../../assets/phone.png';
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

  setActionBody = async () => {
    const actionBody = await this.fetchActionBody('twitter_contents', this.props.action);
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

  render () {
    const { title, description, phone_number } = this.props.action;
    const expanded = this.state.actionBody !== null;

    let buttonText = expanded ? 'COMPLETED!' : 'CALL';
    const buttonOnClick = expanded ? () => logAction('phone_actions', this.props.user, this.props.action, this.feedbackTextArea.value) : this.setActionBody;
    const phoneNumber = expanded ? <p className="phone-number">{`Call ${phone_number}, and then click completed!`}</p> : null;
    const textArea = expanded ? <textarea className="body-text feedback-textarea" placeholder="How did this call go for you? Please leave your feedback here!" ref={(input) => this.feedbackTextArea = input }></textarea> : null;
    const cancelButton = expanded ? <button onClick={() => this.resetBody(null)}>CANCEL</button>: null;
    const script = expanded ? <textarea className="script body-text" onChange={(e) => this.resetBody(e.target.value)} value={this.state.actionBody}></textarea> : null;

    if (this.props.user.admin) {
      buttonText = `${this.state.actionCount} people have taken this action!`;
    }

    return (
      <div className="ActionCard phone-card">
        <h3>{title}</h3>
        <p className="action-description">{description}</p>

        {phoneNumber}
        {script}

        {textArea}
        <div className="button-holder">
          <button onClick={ buttonOnClick }>{buttonText}<i className="icon-phone"></i></button>
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default PhoneCard;
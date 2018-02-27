import React, { Component } from 'react';
import phoneLogo from '../../assets/phone.png';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';

class PhoneCard extends Component {
  constructor () {
    super();
    this.state = {
      actionBody: null
    }
    this.fetchActionBody = fetchActionBody.bind(this);
  }

  setActionBody = async () => {
    const actionBody = await this.fetchActionBody('twitter_contents', this.props.action);
    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  render () {
    const { title, description, phone_number } = this.props.action;
    const expanded = this.state.actionBody !== null;

    const buttonText = expanded ? 'COMPLETED!' : 'CALL';
    const buttonOnClick = expanded ? () => logAction('phone_actions', this.props.user, this.props.action) : this.setActionBody;
    const phoneNumber = expanded ? <p>{`Call ${phone_number}, and then click completed!`}</p> : null;
    const userFeedback = expanded ? <label>We would love to hear how this call went for you:<textarea className="feedback-textarea" placeholder="How did this call go for you?"></textarea></label> : null;
    const cancelButton = expanded ? <button onClick={() => this.resetBody(null)}>CANCEL</button>: null;
    const textArea = expanded ? <label>Here is an optional script for your call: <textarea onChange={(e) => this.resetBody(e.target.value)} value={this.state.actionBody}></textarea></label> : null;

    return (
      <div className="ActionCard phone-card">
        <div className="action-logo-holder">
          <img className="action-logo" src={phoneLogo} alt="Phone Symbol"/>
        </div>
        <div className="action-card-main">
          <h3>{title}</h3>
          <p>{description}</p>

          {phoneNumber}
          {textArea}

          {userFeedback}
          <div className="button-holder">
            <button onClick={ buttonOnClick }>{ buttonText }</button>
            {cancelButton}
          </div>
        </div> 
      </div>
    );
  }
}

export default PhoneCard;
import React, { Component } from 'react';
import twitterLogo from '../../assets/twitter.png';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';

class TwitterCard extends Component {
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

  render() {
    const { title, description, target } = this.props.action;
    const buttonText = this.state.actionBody === null ? 'CLICK TO TWEET' : 'TWEET NOW';

    const buttonOnClick = this.state.actionBody === null 
      ? this.setActionBody
      : () => { logAction('twitter_actions', this.props.user, this.props.action) };

    const targetLink = this.state.actionBody === null ? null : target;

    const cancelButton = this.state.actionBody === null 
      ? null
      : <button onClick={() => this.setState({ actionBody: null })}>Cancel</button>;

    const textArea = this.state.actionBody === null ? null
      :  <textarea onChange={(event) => this.setState({ actionBody: event.target.value })}value={this.state.actionBody}></textarea>

    return (
      <div className="ActionCard twitter-card">
        <div className="action-logo-holder">
          <img className="action-logo" src={twitterLogo} alt="Twitter Symbol"/>
        </div>
        <div className="action-card-main">
          <h3>{title}</h3>
          <p>{description}</p>

          {textArea}
          <a href={targetLink} target="_blank">
            <button onClick={ buttonOnClick }>{buttonText}</button>
          </a>
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default TwitterCard;
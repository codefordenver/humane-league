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

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  render() {
    const { title, description, target } = this.props.action;
    const expanded = this.state.actionBody !== null;

    const buttonText = expanded ? 'TWEET NOW' : 'CLICK TO TWEET';
    const buttonOnClick = expanded ? logAction('twitter_actions', this.props.user, this.props.action) : this.setActionBody;
    const targetLink = expanded ? target : null;
    const cancelButton = expanded ? <button onClick={() => this.resetBody(null)}>Cancel</button>: null;
    const textArea = expanded ? <textarea onChange={(e) => this.resetBody(e.target.value)} value={this.state.actionBody}></textarea> : null;

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
import React, { Component } from 'react';
import facebookLogo from '../../assets/facebook.png';
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

  setActionBody = async () => {
    console.log('setActionBody');
    const actionBody = await this.fetchActionBody('facebook_contents', this.props.action);
    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  render() {
    const { title, description, target } = this.props.action;
    const expanded = this.state.actionBody !== null;

    const buttonText = expanded ? 'GO' : 'FACEBOOK';
    const buttonOnClick = expanded ? logAction('facebook_actions', this.props.user, this.props.action) : this.setActionBody;
    const targetLink = expanded ? target : null;
    const cancelButton = expanded ? <button onClick={() => this.resetBody(null)}>CANCEL</button>: null;
    const textArea = expanded ? <textarea onChange={(e) => this.resetBody(e.target.value)} value={this.state.actionBody}></textarea> : null;
    
    return (
      <div className="ActionCard facebook-card">
        <h3>{title}</h3>
        <p>{description}</p>

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
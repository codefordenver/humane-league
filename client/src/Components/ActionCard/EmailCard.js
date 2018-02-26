import React, {Component} from 'react';
import emailLogo from '../../assets/email.png';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';


class EmailCard extends Component {
  constructor () {
    super();
    this.state = {
      actionBody: null
    }
    this.fetchActionBody = fetchActionBody.bind(this);
  }

  setActionBody = async () => {
    const actionBody = await this.fetchActionBody('email_contents', this.props.action);
    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  render () {
    const { title, description, to, cc, bcc, subject } = this.props.action;
    const expanded = this.state.actionBody !== null;

    const buttonText = expanded ? 'GO' : 'TWEET';
    const buttonOnClick = expanded ? logAction('email_actions', this.props.user, this.props.action) : this.setActionBody;
    const targetLink = expanded ? `mailto:${to}?subject=${subject}$body=${this.state.actionBody}` : null;
    const cancelButton = expanded ? <button onClick={() => this.resetBody(null)}>CANCEL</button>: null;
    const textArea = expanded ? <textarea onChange={(e) => this.resetBody(e.target.value)} value={this.state.actionBody}></textarea> : null;

    const emailContent = 
      <div className="email-template">
        <p><strong>To:</strong> {to}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Body:</strong> {this.state.ActionBody}</p>
      </div>;

    return (
      <div className="ActionCard email-card">
        <div className="action-logo-holder">
          <img className="action-logo" src={emailLogo} alt="Email Symbol"/>
        </div>
        <div className="action-card-main">
          <h3>{title}</h3>
          <p>{description}</p>
          
          {textArea}

          <a href={targetLink}>
            <button onClick={ buttonOnClick }>EMAIL</button>
          </a> 
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default EmailCard;
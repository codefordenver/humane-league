import React, {Component} from 'react';
import emailLogo from '../../assets/email.png';
import logAction from '../../utils/logAction';
import fetchActionBody from '../../utils/fetchActionBody';


class EmailCard extends Component {
  constructor () {
    super();
    this.state = {
      actionBody: null,
      showContent: false
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

    const buttonText = expanded ? 'SEND' : 'EMAIL';
    const buttonOnClick = expanded ? () => logAction('email_actions', this.props.user, this.props.action) : this.setActionBody;
    const targetLink = expanded ? `mailto:${to}?subject=${subject}&body=${this.state.actionBody}` : null;
    const cancelButton = expanded ? <button onClick={() => this.resetBody(null)}>CANCEL</button>: null;
    const showContentButton = expanded ? <button onClick={() => this.setState({ showContent: !this.state.showContent })}>VIEW EMAIL DETAILS</button> : null;
    const textArea = expanded ? <textarea className="body-text" onChange={(e) => this.resetBody(e.target.value)} value={this.state.actionBody}></textarea> : null;

    const emailContent = this.state.showContent ?
      <div className="email-template">
        <p><strong>To:</strong> {to}</p>
        <p><strong>Subject:</strong> {subject}</p>
      </div>
      : null;

    return (
      <div className="ActionCard email-card">
        <h3>{title}</h3>
        <p className="action-description">{description}</p>
        
        {showContentButton}
        {emailContent}
        {textArea}

        <div className="button-holder">
          <a href={targetLink}>
            <button onClick={ buttonOnClick }>{buttonText}<i className="icon-mail"></i></button>
          </a> 
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default EmailCard;
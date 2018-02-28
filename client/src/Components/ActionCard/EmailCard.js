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

  componentDidMount () {
    if (this.props.user.admin) {
      this.actionCount();
    }
  };

  setActionBody = async () => {
    const actionBody = await this.fetchActionBody('email_contents', this.props.action);
    this.setState({ actionBody });
  }

  resetBody = async (newBody) => {
    this.setState({ actionBody: newBody });
  }

  completeAction = () => {
    this.props.removeCompleted('email', this.props.action.id);
    logAction('email_actions', this.props.user, this.props.action);
  }

  actionCount = async () => {
    const actionLogFetch = await fetch('/api/v1/actions');
    const actionLog = await actionLogFetch.json();
    const actionCount = actionLog.results.filter(actionLog => (actionLog.action_id === this.props.action.id && actionLog.action_type === 'email_actions')).length;
    await this.setState({ actionCount });
  }

  render () {
    const { title, description, to, cc, bcc, subject } = this.props.action;
    const expanded = this.state.actionBody !== null;

    let buttonText = expanded ? 'SEND' : 'EMAIL';
    const buttonOnClick = expanded ? this.completeAction: this.setActionBody;
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

    if (this.props.user.admin) {
      buttonText = `${this.state.actionCount} people have taken this action!`
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
            <button onClick={ buttonOnClick }>{buttonText}<i className="icon-mail"></i></button>
          </a> 
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default EmailCard;
import React, { Component } from 'react';
// import './UpdateAction.css';

class UpdateAction extends Component {
  constructor() {
    super();
    this.state = {
      actionType: 'facebook',
      facebook: [],
      twitter: [],
      email: [],
      phone: []
    }
  }

  async componentDidMount() {
    const facebookFetch = await fetch('/api/v1/facebook_actions');
    const facebookActions = await facebookFetch.json();
    const facebook = facebookActions.results;

    const twitterFetch = await fetch('/api/v1/twitter_actions');
    const twitterActions = await twitterFetch.json();
    const twitter = twitterActions.results;

    const emailFetch = await fetch('/api/v1/email_actions');
    const emailActions = await emailFetch.json();
    const email = emailActions.results;

    const phoneFetch = await fetch('/api/v1/phone_actions');
    const phoneActions = await phoneFetch.json();
    const phone = phoneActions.results;

    await this.setState({ facebook, twitter, email, phone });
  };

  handleChange = () => {
    const actionType = this.updateActionTypes.value;
    
    this.setState({ actionType });
  }

  handleActionClick = (event) => {
    console.log(event.target);
    
  }

  handleUpdate = () => {

  }

  render() {
    const actions = this.state[this.state.actionType].map((action, i) => {
      return (
        <li key={`li-${i}`} className='action'>
          <p onClick={this.handleActionClick}>{`ACTION ${i}: ${action.title}`}</p>
          {/*<span id='toggle'>
            <input onChange={this.handleUpdate} checked={action.enabled} ref={(elem) => {this[`toggle${i}`] = elem}} type='checkbox'/>
            <label 
              data-on='enabled' 
              data-off='disabled'>
            </label>
          </span>*/}
        </li>
      )
    });

    return (
      <div className='UpdateAction'>
        <h1>Enable and Disable <span>{this.state.actionType.toUpperCase()}</span> Actions</h1>
        <label htmlFor='action-types'>Select Action Type:
          <select onChange={this.handleChange} ref={(elem) => {this.updateActionTypes = elem}} name='action-types' id='action-types'>
            <option value='facebook'>Facebook</option>
            <option value='twitter'>Twitter</option>
            <option value='email'>Email</option>
            <option value='phone'>Phone</option>
          </select>
        </label>
        <div className='actions-container'>
          <ul className='actions'>
            {actions}
          </ul>
        </div>
      </div>
    )
  }
}

export default UpdateAction;
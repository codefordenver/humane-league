import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getTwitterActions, 
  getFacebookActions, 
  getEmailActions, 
  getPhoneActions,
  getCompletedActions,
  patchAction } from '../../utils/apiCalls';

// import './UpdateAction.css';

class UpdateAction extends Component {
  constructor() {
    super();
    this.state = {
      actionType: 'facebook',
      action: {},
      showForm: false,
      facebook: [],
      twitter: [],
      email: [],
      phone: []
    }
  }

  async componentDidMount() {
    const facebook = await getFacebookActions();
    const twitter = await getTwitterActions();
    const email = await getEmailActions();
    const phone = await getPhoneActions();

    await this.setState({ facebook, twitter, email, phone });
  };

  handleChange = () => {
    const actionType = this.updateActionTypes.value;
    
    this.setState({ actionType });
  }

  handleActionClick = (event) => {
    const actionId = event.target.dataset.id;
    const action = this.state[this.state.actionType].find(action => action.id == actionId);

    this.setState({ showForm: true, actionEnabled: action.enabled, action });
  }

  submitPatch = async () => {
    const oldAction = this.state.action;
    const type = this.state.actionType;

    const action = Object.assign({ ...oldAction }, { enabled: this.state.actionEnabled });
    const actionId = action.id;

    const token = this.props.user.id_token;
    const actionPatch = await patchAction(type, actionId, token, action);

    if (actionPatch.status === 204) {
      const removedAction = this.state[this.state.actionType].filter(action => action.id !== actionId);
      const newState = [...removedAction, action];
      this.setState({ [type]: newState, showForm: false, success: `Sucessfully updated action ${action.id}`});
        setTimeout(() => {
        this.setState({ success: false });
      }, 3000);
    }
  }

  render() {
    const actions = this.state[this.state.actionType].map((action, i) => {
      return (
        <li key={`li-${i}`} className='action'>
          <p data-id={action.id} onClick={this.handleActionClick}>{`ACTION ${i}: ${action.title}`}</p>
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
        {
          this.state.success && 
          <p>{this.state.success}</p>
        }
        {
          this.state.showForm &&
          <div className='update-form'>   
            <span id='toggle'>
              <input onChange={() => this.setState({ actionEnabled: !this.state.actionEnabled })} checked={this.state.actionEnabled} ref={(elem) => {this.toggle = elem}} type='checkbox'/>
              <label 
                data-on='enabled' 
                data-off='disabled'>
              </label>
            </span>
            <button onClick={this.submitPatch} className='update-action'>Save Update</button>
          </div>
        }
        <div className='actions-container'>
          <ul className='actions'>
            {actions}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(UpdateAction);
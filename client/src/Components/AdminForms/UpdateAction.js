/* eslint-disable no-undef */
/* eslint-disable no-console */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionForm from './ActionForm';
import { 
  getTwitterActions, 
  getFacebookActions, 
  getEmailActions, 
  getPhoneActions,
  patchAction,
  patchActionContent,
  postActionContent } from '../../utils/apiCalls';

export class UpdateAction extends Component {
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
    };
  }

  async componentDidMount() {
    const facebook = await getFacebookActions();
    const twitter = await getTwitterActions();
    const email = await getEmailActions();
    const phone = await getPhoneActions();

    await this.setState({ facebook, twitter, email, phone });
  }

  handleChange = () => {
    const actionType = this.updateActionTypes.value;
    
    this.setState({ actionType });
  }

  handleActionClick = (event) => {
    const actionId = event.target.dataset.id;
    const action = this.state[this.state.actionType].find(action => action.id == actionId);

    this.setState({ showForm: true, action });
    window.scrollTo(0, 0);
  }

  submitPatch = async (action, actionBodies) => {
    const actionId = this.state.action.id;
    const type = this.state.actionType;
    const newAction = Object.assign({ ...action }, { id: actionId });
    const token = this.props.user.id_token;

    const actionPatch = await patchAction(type, actionId, token, newAction);

    if (actionPatch.status === 204) {
      for (let i = 0; i < actionBodies.length; i++) {
        let content = actionBodies[i];
        if (content.action_id) {
          const contentID = await patchActionContent(type, actionId, token, content.content);
          console.log('patch:', contentID);
        } else {
          const contentID = await postActionContent(type, {id: actionId}, token, content.content);
          console.log('post:', contentID);
        }
      }

      const updatedActions = this.state[type].map(action => {
        return action.id === actionId ? newAction : action;
      });

      this.setState({ [type]: updatedActions, showForm: false, success: `Sucessfully updated action ${newAction.id}`});
      setTimeout(() => {
        this.setState({ success: false });
      }, 3000);
    }
  }

  render() {
    const actions = this.state[this.state.actionType].map((action, i) => {
      return (
        <li key={`li-${i}`} className='action'>
          <p data-id={action.id} onClick={this.handleActionClick}>{`${action.title}`}</p>
        </li>
      );
    });

    return (
      <div className='UpdateAction'>
        <h1>Enable and Disable <span>{this.state.actionType.toUpperCase()}</span> Actions</h1>
        {
          this.state.success && 
          <p>{this.state.success}</p>
        }
        <div className='update-container'>
          <label htmlFor='action-types'>Select Action Type:
          <select onChange={this.handleChange} ref={(elem) => { this.updateActionTypes = elem; }} name='action-types' id='action-types'>
            <option value='facebook'>Facebook</option>
            <option value='twitter'>Twitter</option>
            <option value='email'>Email</option>
            <option value='phone'>Phone</option>
          </select>
          </label>
          {
            this.state.showForm &&
            <div>
              <button onClick={() => this.setState({ showForm: false })}>Cancel</button>
              <ActionForm 
                form={this.state.actionType} 
                action={this.state.action}
                submitPatch={this.submitPatch}
              />
            </div>
          // <div className='update-action'>
          //   <p>{`TITLE: ${this.state.action.title}`}</p>
          //   <p>{`DESCRIPTION: ${this.state.action.description}`}</p>
          //   <div className='update-form'>  
          //     <span id='toggle'>
          //       <input onChange={() => this.setState({ actionEnabled: !this.state.actionEnabled })} checked={this.state.actionEnabled} ref={(elem) => { this.toggle = elem; }} type='checkbox'/>
          //       <label 
          //         data-on='enabled' 
          //         data-off='disabled'>
          //       </label>
          //     </span>
          //     <button onClick={this.submitPatch} className='update-action'>Save Update</button>
          //   </div> 
          // </div>
          }
          <div className='actions-container'>
            <h3>Click an action to see or change status</h3>
            <ul className='actions'>
              {actions}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(UpdateAction);

UpdateAction.propTypes = {
  user: PropTypes.object
};
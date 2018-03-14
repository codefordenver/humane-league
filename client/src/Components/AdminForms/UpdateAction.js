/* eslint-disable no-undef */
/* eslint-disable no-console */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionForm from './ActionForm';
import './UpdateAction.css';
import { 
  getTwitterActions, 
  getFacebookActions, 
  getEmailActions, 
  getPhoneActions,
  patchAction,
  patchActionContent,
  postActionContent,
  postAction,
  deleteActionContent} from '../../utils/apiCalls';

export class UpdateAction extends Component {
  constructor() {
    super();
    this.state = {
      actionType: 'facebook',
      action: {},
      showForm: false,
      sortBy: 'all',
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
    const action = this.state[this.state.actionType].find(action => parseInt(action.id, 10) === parseInt(actionId, 10));

    this.setState({ showForm: true, action });
    window.scrollTo(0, 0);
  }

  actionPost = async (action, actionBodies, type) => {
    const token = this.props.user.id_token;

    const actionID = await postAction(action, type, token);

    if (actionID.id) {
      for (let i = 0; i < actionBodies.length; i++) {
        let content = actionBodies[i].content;
        const contentID = await postActionContent(type, actionID, token, content);
        
        if (contentID.error) {
          this.setState({ error: `Could not create action content: ${contentID.error}`});
          setTimeout(() => {
            this.setState({ error: false });
          }, 5000);
        } else if (contentID.id) {
          return contentID;
        }
      }

    } else if (actionID.error) {
      this.setState({ error: `Could not create action: ${actionID.error}`});
      setTimeout(() => {
        this.setState({ error: false });
      }, 5000);
    }
  }

  handleSubmit = async (action, actionBodies) => {
    const postResult = await this.actionPost(action, actionBodies, this.state.actionType);
    const updatedActions = [...this.state[this.state.actionType], action];
    if (postResult) {
      this.setState({ success: 'ACTION CREATED!', showForm: false, [this.state.actionType]: updatedActions });
      setTimeout(() => {
        this.setState({ success: false });
      }, 5000);
      return true;
    } else {
      return false;
    }
  }

  submitPatch = async (action, actionBodies, bodiesToDelete) => {
    const actionId = this.state.action.id;
    const type = this.state.actionType;
    const newAction = Object.assign({ ...action }, { id: actionId });
    const token = this.props.user.id_token;

    const actionPatch = await patchAction(type, actionId, token, newAction);

    if (actionPatch.status === 204) {
      for (let i = 0; i < actionBodies.length; i++) {
        let content = actionBodies[i];
        if (content.action_id) {
          await patchActionContent(type, content.id, token, content.content);
        } else {
          await postActionContent(type, {id: actionId}, token, content.content);
        }
      }

      for (let i = 0; i < bodiesToDelete.length; i++) {
        let contentId = bodiesToDelete[i].id;
        await deleteActionContent(type, contentId, token);
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

  handleSort = (event) => {
    const sortBy = event.target.value;

    this.setState({ sortBy });
  }

  render() {
    let actions = this.state[this.state.actionType].filter(action => {
      if (this.state.sortBy === 'all') {
        return action;
      } else if (this.state.sortBy === 'enabled') {
        return action.enabled;
      } else if (this.state.sortBy === 'disabled') {
        return !action.enabled;
      }
    });

    actions = actions.map((action, i) => {
      const actionClass = action.enabled ? 'action' : 'action disabled';
      return (
        <li key={`li-${i}`} className={actionClass}>
          <p data-id={action.id} onClick={this.handleActionClick}>{`${action.title}`}</p>
        </li>
      );
    });

    return (
      <div className='UpdateAction'>
        <h1>Update and Edit <span>{this.state.actionType.toUpperCase()}</span> Actions</h1>
        {
          this.state.success && 
          <p>{this.state.success}</p>
        }
        <div className='update-container'>
          <div className='update-controls'>
            <label htmlFor='action-types'>Select Action Type:
              <select onChange={this.handleChange} ref={(elem) => { this.updateActionTypes = elem; }} name='action-types' id='action-types'>
                <option value='facebook'>Facebook</option>
                <option value='twitter'>Twitter</option>
                <option value='email'>Email</option>
                <option value='phone'>Phone</option>
              </select>
            </label>
            <div className='sort-by'>
              <p>Sort by:</p>
              
              <label><input type='radio' name='sort-by' value='all' onChange={this.handleSort} checked={this.state.sortBy === 'all'}/>All</label>

              <label><input type='radio' name='sort-by' value='enabled' onChange={this.handleSort} checked={this.state.sortBy === 'enabled'}/>Enabled</label>

              <label><input type='radio' name='sort-by' value='disabled' onChange={this.handleSort} checked={this.state.sortBy === 'disabled'}/>Disabled</label>
            </div>
          </div>
          <div className='actions-container'>
            <h3>Click an action to see or change status</h3>
            <ul className='actions'>
              {actions}
            </ul>
          </div>    
          {
            this.state.showForm &&
            <div className='edit-action-form'>
              <h3 className='edit-title'>Change any field to edit this action...</h3>
              <ActionForm 
                form={this.state.actionType} 
                action={this.state.action}
                submitPatch={this.submitPatch}
                handleSubmit={this.handleSubmit}
              />
              <button className='cancel' onClick={() => this.setState({ showForm: false })}>Cancel Editing</button>
            </div>
          } 
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
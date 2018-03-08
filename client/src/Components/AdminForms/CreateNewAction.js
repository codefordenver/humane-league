/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import PropTypes from 'prop-types';
import './AdminForms.css';
import { postAction, postActionContent } from '../../utils/apiCalls';

export class CreateNewAction extends Component {
  constructor() {
    super();
    this.state = {
      form: 'facebook',
      error: false,
      success: false
    };
  }

  actionPost = async (action, actionBodies, type) => {
    const token = this.props.user.id_token;

    const actionID = await postAction(action, type, token);

    if (actionID.id) {
      for (let i = 0; i < actionBodies.length; i++) {
        let content = actionBodies[i];
        const contentID = await postActionContent(type, token, actionID, content);
        
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

  handleChange = () => {
    const form = this.actionTypes.value;
    
    this.setState({ form });
  }

  handleSubmit = async (action, actionBodies) => {
    const postResult = await this.actionPost(action, actionBodies, this.state.form);

    if (postResult) {
      this.setState({ success: 'ACTION CREATED!' });
      setTimeout(() => {
        this.setState({ success: false });
      }, 5000);
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className='create-new-action-container'>
        <h1>CREATE A NEW <span>{this.state.form.toUpperCase()}</span> ACTION</h1>
        <section className='select-action-container'>
          <label htmlFor='action-types'>Select Action Type:
          <select onChange={() => this.handleChange()} ref={(elem) => { this.actionTypes = elem; }} name='action-types' id='action-types'>
            <option value='facebook'>Facebook</option>
            <option value='twitter'>Twitter</option>
            <option value='email'>Email</option>
            <option value='phone'>Phone</option>
          </select>
          {
            this.state.error && 
              <h1>{this.state.error}</h1>
          }
          {
            this.state.success &&
              <h1>{this.state.success}</h1>
          }
          </label>

          <ActionForm form={this.state.form} handleSubmit={this.handleSubmit}/>

        </section>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(CreateNewAction);

CreateNewAction.propTypes = {
  user: PropTypes.object
};
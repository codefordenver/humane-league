/* eslint-disable import/no-named-as-default*/

import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import CreateNewAction from '../AdminForms/CreateNewAction';
import UpdateAction from '../AdminForms/UpdateAction';
import AddContent from '../AdminForms/AddContent';
import ActionLog from '../AdminForms/ActionLog';
import UserFeedback from '../AdminForms/UserFeedback';
import AdminActions from '../AdminActions/AdminActions';
import './AdminDashboard.css';

class AdminDashboard extends Component {
  componentDidMount() {
    if (!this.props.User.admin) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div className='AdminDashboard'>
        <Switch>
          <Route exact path='/admin' component={Dashboard} />
          <Route path='/admin/create' component={CreateNewAction} />
          <Route path='/admin/update' component={UpdateAction} />
          <Route path='/admin/addcontent' component={AddContent} />
          <Route path='/admin/log' component={ActionLog} />
          <Route path='/admin/feedback' component={UserFeedback} />
          <Route path='/admin/actions' component={AdminActions} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  User: store.User 
});

export default connect(mapStateToProps, null)(AdminDashboard);

AdminDashboard.propTypes = {
  User: PropTypes.object,
  history: PropTypes.object
};
/* eslint-disable import/no-named-as-default*/

import React from 'react';
import { Switch, Route } from 'react-router';
import Dashboard from './Dashboard';
import CreateNewAction from '../AdminForms/CreateNewAction';
import UpdateAction from '../AdminForms/UpdateAction';
import AddContent from '../AdminForms/AddContent';
import ActionLog from '../AdminForms/ActionLog';
import UserFeedback from '../AdminForms/UserFeedback';
import AdminActions from '../AdminActions/AdminActions';
import './AdminDashboard.css';

export const AdminDashboard = () => {
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
};

export default AdminDashboard;
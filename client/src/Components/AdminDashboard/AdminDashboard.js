import React from 'react';
import { Switch, Route } from 'react-router';
import Dashboard from './Dashboard';
import CreateNewAction from '../AdminForms/CreateNewAction';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // const handleClick = (event) => {
  //   console.log('click')
  //   console.log(event.target);
  // }

  return (
    <div className='AdminDashboard'>
      <h1 className='admin-greeting'>ADMIN DASHBOARD</h1>
      <Switch>
        <Route exact path='/admin' component={Dashboard} />
        <Route path='/admin/create' component={CreateNewAction} />
      </Switch>
    </div>
  )
}

export default AdminDashboard;
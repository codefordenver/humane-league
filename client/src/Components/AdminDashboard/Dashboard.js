import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Dashboard.css';

const Dashboard = () => {
  return (
    <section className='main-dashboard'>
      <h1 className='admin-greeting'>Admin Dashboard</h1>
      
      <div className="dashboard-container">
        <div className='dashboard-section'>
          <h2>MANAGE ACTIONS</h2>

          <NavLink 
            to='/admin/create' 
            className='admin-btn create-new-action'>
            Create New Action</NavLink>
          <NavLink 
            to='/admin/update'
            className='admin-btn enable-disable'>
            Edit/Update Actions</NavLink>
        </div>
        <div className='dashboard-section'>
          <h2>ANALYTICS</h2>

          <NavLink 
            to='/admin/log'
            className='admin-btn action-log'>
            Action Log</NavLink>
          <NavLink 
            to='/admin/feedback'
            className='admin-btn user-feedback'>
            User Feedback</NavLink>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
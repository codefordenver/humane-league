import React from 'react';
import { NavLink } from 'react-router-dom'
// import './Dashboard.css';

const Dashboard = () => {
  return (
    <section className='main-dashboard'>
      <div className='dashboard-section'>
        <h2>MANAGE ACTIONS</h2>

        <NavLink 
          to='/admin/create' 
          className='admin-btn create-new-action'>
          CREATE NEW ACTION</NavLink>
        <NavLink 
          to='/admin/update'
          className='admin-btn enable-disable'>
          ENABLE/DISABLE</NavLink>
        <NavLink 
          to='/admin/addcontent'
          className='admin-btn add-content'>
          EDIT ACTIONS</NavLink>
      </div>
      <div className='dashboard-section'>
        <h2>ANALYTICS</h2>

        <NavLink 
          to='/admin/log'
          className='admin-btn action-log'>
          ACTION LOG</NavLink>
        <NavLink 
          to='/admin/feedback'
          className='admin-btn user-feedback'>
          USER FEEDBACK</NavLink>
      </div>
    </section>
  )
}

export default Dashboard;
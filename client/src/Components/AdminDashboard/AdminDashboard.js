import React, { Component } from 'react';
import './AdminDashboard.css';

class AdminDashboard extends Component {
  constructor() {
    super();
   
  }

  render() {
    return (
      <div className='AdminDashboard'>
        <h1 className='admin-greeting'>ADMIN DASHBOARD</h1>
        <section className='main-dashboard'>
          <div className='dashboard-section action-management'>
            <h2>MANAGE ACTIONS</h2>
            <button className='admin-btn create-new-action'>CREATE NEW ACTION</button>
            <button className='admin-btn enable-disable'>ENABLE/DISABLE</button>
            <button className='admin-btn add-content'>ADD ACTION CONTENT</button>
          </div>
          <div className='dashboard-section data-management'>
            <h2>ANALYTICS</h2>
            <button className='admin-btn action-log'>ACTION LOG</button>
            <button className='admin-btn user-feedback'>USER FEEDBACK</button>
          </div>
        </section>
      </div>
    )
  }
}

export default AdminDashboard;
import React, { Component } from 'react';

class AdminDashboard extends Component {
  constructor() {
    super();
   
  }

  render() {
    return (
      <div>
        <h1>DASHBOARD</h1>
        <section className='main-dashoard'>
          <button className='admin-btn create-new-action'>CREATE NEW ACTION</button>
          <button className='admin-btn enable-disable'>ENABLE/DISABLE</button>
          <button className='admin-btn add-content'>ADD ACTION CONTENT</button>
          <button className='admin-btn action-data'>ACTION DATA</button>
          <button className='admin-btn user-feedback'>VIEW USER FEEDBACK</button>
        </section>
      </div>
    )
  }
}

export default AdminDashboard;
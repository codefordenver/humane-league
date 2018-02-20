import React from 'react';
import { NavLink } from 'react-router-dom'
// import './Dashboard.css';

const Dashboard = () => {
  const handleClick = (event) => {
    console.log('click')
    console.log(event.target);
  }

  return (
    <section className='main-dashboard'>
      <div className='dashboard-section'>
        <h2>MANAGE ACTIONS</h2>
        <NavLink 
          to='/admin/create' 
          className='admin-btn create-new-action'>
          CREATE NEW ACTION
        </NavLink>
        <button className='admin-btn enable-disable'
          onClick={handleClick}>ENABLE/DISABLE</button>
        <button className='admin-btn add-content'
          onClick={handleClick}>ADD ACTION CONTENT</button>
      </div>
      <div className='dashboard-section'>
        <h2>ANALYTICS</h2>
        <button className='admin-btn action-log'
          onClick={handleClick}>ACTION LOG</button>
        <button className='admin-btn user-feedback'
          onClick={handleClick}>USER FEEDBACK</button>
      </div>
    </section>
  )
}

export default Dashboard;
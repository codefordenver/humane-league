import React, { Component } from 'react';

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    }
  }

  render() {
    return (
      <h1>I am a AdminDashboard</h1>
    )
  }
}

export default AdminDashboard;
import React, { Component } from 'react';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    }
  }

  render() {
    return (
      <h1>I am a UserProfile</h1>
    )
  }
}

export default UserProfile;
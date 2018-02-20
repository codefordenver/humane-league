import React, { Component } from 'react';
import './AdminForms.css';

class CreateNewAction extends Component {
  constructor() {
    super();
    this.state = {
      form: 'facebook'
    }
  }

  handleChange = () => {
    const form = this.refs.actionTypes.value;

    this.setState({ form })
  }

  render() {
    const form = 
      <form>
        <input type='text' placeholder={this.state.form}/>
      </form>;

    return (
      <div className='create-new-action'>
        <h1>CREATE A NEW ACTION</h1>
        <label htmlFor='action-types'>Select Action Type:</label>
        <select onChange={() => this.handleChange()} ref='actionTypes' name='action-types' id='action-types'>
          <option value='facebook'>Facebook</option>
          <option value='twitter'>Twitter</option>
          <option value='email'>Email</option>
          <option value='phone'>Phone</option>
        </select>
        <div className='create-action-form'>
        {form}
        </div>
      </div>
    )
  }
}

export default CreateNewAction;
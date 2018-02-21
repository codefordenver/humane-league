import React, { Component } from 'react';
import './AdminForms.css';

class CreateNewAction extends Component {
  constructor() {
    super();
    this.state = {
      form: 'facebook',
      enabled: true
    }

    this.submit = {
      facebook: this.facebookSubmit,
      twitter: this.twitterSubmit,
      email: this.emailSubmit,
      phone: this.phoneSubmit,
    }
  }

  facebookSubmit = (actionContent) => {
    console.log('facebook', actionContent);
    const title = this.refs.actionTitle.value;
    const description = this.refs.actionDescription.value;
    const target = this.refs.targetUrl.value;

  }

  twitterSubmit = (actionContent) => {
    console.log('twitter', actionContent);
    const title = this.refs.actionTitle.value;
    const description = this.refs.actionDescription.value;
    const target = this.refs.targetUrl.value;

  }

  emailSubmit = (actionContent) => {
    console.log('email', actionContent);
    const title = this.refs.actionTitle.value;
    const description = this.refs.actionDescription.value;
    const to = this.refs.emailTo.value;
    const cc = this.refs.emailCC.value;
    const bcc = this.refs.emailBCC.value;
    const subject = this.refs.emailSubject.value;

  }

  phoneSubmit = (actionContent) => {
    console.log('phone', actionContent);
    const title = this.refs.actionTitle.value;
    const description = this.refs.actionDescription.value;
    const name = this.refs.phoneName.value;
    const position = this.refs.phonePosition.value;
    const number = this.refs.phoneNumber.value;
  }

  handleChange = () => {
    const form = this.refs.actionTypes.value;

    this.setState({ form });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit new action')
    const actionContent = this.refs.actionContent.value;

    this.submit[this.state.form](actionContent);

    //feedback that action was created
  }

  render() {
    const socialMediaTarget = {
      targetUrl: <input type='text' ref='targetUrl' placeholder='Target Url' />
    }  
    const emailTarget = {
      to: <input type='text' ref='emailTo' placeholder='Target Email Address' />,
      cc: <input type='text' ref='emailCC' placeholder='CCs' />,
      bcc: <input type='text' ref='emailBCC' placeholder='BCCs' />,
      subject: <input type='text' ref='emailSubject' placeholder='Email Subject' />,
    }
    const phoneTarget = {
      name: <input type='text' ref='phoneName' placeholder='Target Name' />,
      position: <input type='text' ref='phonePosition' placeholder='Target Position' />,
      phoneNumber: <input type='text' ref='phoneNumber' placeholder='Target Phone Number' />
    }
    const form = {
      facebook: socialMediaTarget,
      twitter: socialMediaTarget,
      email: emailTarget,
      phone: phoneTarget
    }

    return (
      <div className='create-new-action-container'>
        <h1>CREATE A NEW <span>{this.state.form.toUpperCase()}</span> ACTION</h1>
        <section className='select-action-container'>
          <label htmlFor='action-types'>Select Action Type:
            <select onChange={() => this.handleChange()} ref='actionTypes' name='action-types' id='action-types'>
              <option value='facebook'>Facebook</option>
              <option value='twitter'>Twitter</option>
              <option value='email'>Email</option>
              <option value='phone'>Phone</option>
            </select>
          </label>
          <section className='create-action-form'>
            <form action='create-new-action-form'>
              <input type='text' ref='actionTitle' placeholder='Action Title' />
              <input type='text' ref='actionDescription' placeholder='Action Description' />
              {form[this.state.form].targetUrl}

              {form[this.state.form].to}
              {form[this.state.form].cc}
              {form[this.state.form].bcc}
              {form[this.state.form].subject}

              {form[this.state.form].name}
              {form[this.state.form].position}
              {form[this.state.form].phoneNumber}
              <textarea ref='actionContent' placeholder='Action Content'></textarea>

              <span id='toggle'>
                <input
                  ref='enableToggle' 
                  type='checkbox' 
                  checked={this.state.enabled}
                  onChange={() => this.setState({ enabled: !this.state.enabled })} />
                <label 
                  data-on='enabled' 
                  data-off='disabled'>
                </label>
              </span>    
              <button onClick={this.handleSubmit}>CREATE THIS ACTION</button>
            </form>
          </section>
        </section>
      </div>
    )
  }
}

export default CreateNewAction;
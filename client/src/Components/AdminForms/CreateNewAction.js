import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminForms.css';

class CreateNewAction extends Component {
  constructor() {
    super();
    this.state = {
      form: 'facebook',
      actionEnabled: true
    }

    this.submit = {
      facebook: this.facebookSubmit,
      twitter: this.twitterSubmit,
      email: this.emailSubmit,
      phone: this.phoneSubmit,
    }

  }

  createAction = (type) => {
    const baseAction = {
      title: this.actionTitle.value,
      description: this.actionDescription.value
    };

    if (type === 'social') {
      const target = this.targetUrl.value;
      return Object.assign({ enabled: this.state.actionEnabled }, baseAction, { target });
    } else if (type === 'email') {
      const email = {
        to: this.emailTo.value,
        cc: this.emailCC.value,
        bcc: this.emailBCC.value,
        subject: this.emailSubject.value
      };
      return Object.assign({ enabled: this.state.actionEnabled }, baseAction, email);
    } else if (type === 'phone') {
      const phone = {
        name: this.phoneName.value,
        position: this.phonePosition.value,
        phone_number: this.phoneNumber.value
      };
      return Object.assign({ enabled: this.state.actionEnabled }, baseAction, phone);
    }
  }

  actionPost = async (action, content, type) => {
    const token = this.props.user.id_token;
    const actionPost = await fetch(`/api/v1/${type}_actions?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action)
    });

    const actionID = await actionPost.json();
    console.log(actionID);

    if (actionID) {
      const contentPost = await fetch(`/api/v1/${type}_contents?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action_id: actionID.id, content })
      });

      const result = await contentPost.json();
      console.log(result);
    }
  }

  facebookSubmit = async (actionContent) => {
    const action = this.createAction('social');
    console.log(action);

    this.actionPost(action, actionContent, 'facebook');
  }

  twitterSubmit = (actionContent) => {
    const action = this.createAction('social');
    console.log(action);

    this.actionPost(action, actionContent, 'twitter');
  }

  emailSubmit = (actionContent) => {
    const action = this.createAction('email');
    console.log(action);

    this.actionPost(action, actionContent, 'email');
  }

  phoneSubmit = (actionContent) => {
    const action = this.createAction('phone');
    console.log(action);

    this.actionPost(action, actionContent, 'phone');
  }

  handleChange = () => {
    const form = this.actionTypes.value;

    this.setState({ form });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const actionContent = this.actionContent.value;

    this.submit[this.state.form](actionContent);

    //feedback that action was created
  }

  render() {
    const socialMediaTarget = {
      targetUrl: <input type='text' ref={(elem) => {this.targetUrl = elem}} placeholder='Target Url' />
    }  
    const emailTarget = {
      to: <input type='text' ref={(elem) => {this.emailTo = elem}} placeholder='Target Email Address' />,
      cc: <input type='text' ref={(elem) => {this.emailCC = elem}} placeholder='CCs' />,
      bcc: <input type='text' ref={(elem) => {this.emailBCC = elem}} placeholder='BCCs' />,
      subject: <input type='text' ref={(elem) => {this.emailSubject = elem}} placeholder='Email Subject' />,
    }
    const phoneTarget = {
      name: <input type='text' ref={(elem) => {this.phoneName = elem}} placeholder='Target Name' />,
      position: <input type='text' ref={(elem) => {this.phonePosition = elem}} placeholder='Target Position' />,
      phoneNumber: <input type='text' ref={(elem) => {this.phoneNumber = elem}} placeholder='Target Phone Number' />
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
            <select onChange={() => this.handleChange()} ref={(elem) => {this.actionTypes = elem}} name='action-types' id='action-types'>
              <option value='facebook'>Facebook</option>
              <option value='twitter'>Twitter</option>
              <option value='email'>Email</option>
              <option value='phone'>Phone</option>
            </select>
          </label>
          <section className='create-action-form'>
            <form action='create-new-action-form'>
              <input type='text' ref={(elem) => {this.actionTitle = elem}} placeholder='Action Title' />
              <input type='text' ref={(elem) => {this.actionDescription = elem}} placeholder='Action Description' />
              {form[this.state.form].targetUrl}

              {form[this.state.form].to}
              {form[this.state.form].cc}
              {form[this.state.form].bcc}
              {form[this.state.form].subject}

              {form[this.state.form].name}
              {form[this.state.form].position}
              {form[this.state.form].phoneNumber}
              <textarea ref={(elem) => {this.actionContent = elem}} placeholder='Action Content'></textarea>

              <span id='toggle'>
                <input
                  // ref={(elem) => {this.enableToggle = elem}} 
                  type='checkbox' 
                  checked={this.state.actionEnabled}
                  onChange={() => this.setState({ actionEnabled: !this.state.actionEnabled })} />
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

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(CreateNewAction);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AdminForms.css';

class ActionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // form: 'facebook',
      actionEnabled: true,
      actionBodies: [0],
    }
  }

  componentDidMount() {
    if (this.props.action) {
      const type = (this.props.form === 'facebook' || this.state.form === 'twitter')
      ? 'social'
      :  this.props.form;
      console.log(this.props.action)
      this.actionTitle.value = this.props.action.title;
      this.actionDescription.value = this.props.action.description;


      if (type === 'social') {
        this.targetUrl.value = this.props.action.target;
      } else if (type === 'email') {
        this.emailTo.value = this.props.action.to;
        this.emailCC.value = this.props.action.cc;
        this.emailBCC.value = this.props.action.bcc;
        this.emailSubject.value = this.props.action.subject;
      } else if (type === 'phone') {
        this.phoneName.value = this.props.action.name;
        this.phonePosition.value = this.props.action.position;
        this.phoneNumber.value = this.props.action.phone_number;
      }

      // for (let i = 0; i < this.state.actionBodies.length; i++) {
      //   this[`actionContent${i}`].value = '';
      // }

      this.setState({ actionEnabled: this.props.action.enabled })
    }
  }

  submitAction = (event) => {
    event.preventDefault();
    const type = (this.props.form === 'facebook' || this.state.form === 'twitter')
      ? 'social'
      :  this.props.form;
    const action = this.createAction(type);
    const actionBodies = this.state.actionBodies.map((body, i) => this[`actionContent${i}`].value);

    this.props.handleSubmit(action, actionBodies);

    this.resetForm(type)
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

  resetForm = (type) => {
    this.actionTitle.value = '';
    this.actionDescription.value = '';

    if (type === 'social') {
      this.targetUrl.value = '';
    } else if (type === 'email') {
      this.emailTo.value = '';
      this.emailCC.value = '';
      this.emailBCC.value = '';
      this.emailSubject.value = '';
    } else if (type === 'phone') {
      this.phoneName.value = '';
      this.phonePosition.value = '';
      this.phoneNumber.value = '';
    }

    for (let i = 0; i < this.state.actionBodies.length; i++) {
      this[`actionContent${i}`].value = '';
    }

    this.setState({ actionEnabled: true });
  }

  addTextArea = (event) => {
    event.preventDefault();
    let actionBodies = [...this.state.actionBodies];
    let nextBody = actionBodies.length;
    actionBodies.push(nextBody);

    this.setState({ actionBodies });
  }

  deleteBody = (event) => {
    event.preventDefault();
    let actionBodies = [...this.state.actionBodies];
    console.log(event.target.dataset.id, actionBodies[1])
    actionBodies = actionBodies.filter((body, i) => i !== parseInt(event.target.dataset.id));
    console.log(actionBodies)

    this.setState({ actionBodies });
  }

  renderTextAreas = () => {
    return this.state.actionBodies.map((body, i) => {
      if (i <= 0) {
        return (
          <div key={`textarea-${i}`} className='textarea'>
            <textarea ref={(elem) => { this[`actionContent${i}`] = elem; }} placeholder='Action Body'></textarea>
          </div>
        );
      } else {
        return (
          <div key={`textarea-${i}`} className='textarea'>
            <button onClick={this.deleteBody} data-id={i} className='delete-textarea'>X</button>
            <textarea ref={(elem) => { this[`actionContent${i}`] = elem; }} placeholder='Action Body'></textarea>
          </div>
        ); 
      }
    });
  }

  render() {
    const socialMediaTarget = {
      targetUrl: <input type='text' ref={(elem) => { this.targetUrl = elem; }} placeholder='Target Url' />
    };  
    const emailTarget = {
      to: <input type='text' ref={(elem) => { this.emailTo = elem; }} placeholder='Target Email Address' />,
      cc: <input type='text' ref={(elem) => { this.emailCC = elem; }} placeholder='CCs' />,
      bcc: <input type='text' ref={(elem) => { this.emailBCC = elem; }} placeholder='BCCs' />,
      subject: <input type='text' ref={(elem) => { this.emailSubject = elem; }} placeholder='Email Subject' />
    };
    const phoneTarget = {
      name: <input type='text' ref={(elem) => { this.phoneName = elem; }} placeholder='Target Name' />,
      position: <input type='text' ref={(elem) => { this.phonePosition = elem; }} placeholder='Target Position' />,
      phoneNumber: <input type='text' ref={(elem) => { this.phoneNumber = elem; }} placeholder='Target Phone Number' />
    };
    const form = {
      facebook: socialMediaTarget,
      twitter: socialMediaTarget,
      email: emailTarget,
      phone: phoneTarget
    };

    return (
      <section className='create-action-form'>
        <form>
          <input type='text' ref={(elem) => { this.actionTitle = elem; }} placeholder='Action Title' />
          <input type='text' ref={(elem) => { this.actionDescription = elem; }} placeholder='Action Description' />
          {form[this.props.form].targetUrl}

          {form[this.props.form].to}
          {form[this.props.form].cc}
          {form[this.props.form].bcc}
          {form[this.props.form].subject}

          {form[this.props.form].name}
          {form[this.props.form].position}
          {form[this.props.form].phoneNumber}

          {this.renderTextAreas()}

          <button onClick={this.addTextArea} className='add-text-area'>+ Add another body</button>
          
          <span id='toggle'>
            <input
              type='checkbox' 
              checked={this.state.actionEnabled}
              onChange={() => this.setState({ actionEnabled: !this.state.actionEnabled })} />
            <label 
              data-on='enabled' 
              data-off='disabled'>
            </label>
          </span>    
          <button onClick={this.submitAction}>SAVE ACTION</button>
        </form>
      </section>
    )
  }
}

export default ActionForm;

ActionForm.propTypes = {
  action: PropTypes.object,
  form: PropTypes.string
};

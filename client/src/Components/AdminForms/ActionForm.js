import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AdminForms.css';

class ActionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionEnabled: true,
      actionBodies: []
    }
  }

  componentDidMount() {
    if (this.props.action) {
      this.populateEditAction()
    }
    const actionBodies = [{ id: 0, value: '' }];

    this.setState({ actionBodies });
  }

  populateEditAction = async () => {
    const type = (this.props.form === 'facebook' || this.state.form === 'twitter')
    ? 'social'
    :  this.props.form;

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

    const actionBodiesFetch = await fetch(`/api/v1/${this.props.form}_contents`);
    let actionBodies = await actionBodiesFetch.json();
    actionBodies = actionBodies.results.filter(body => body.action_id === this.props.action.id);

    this.setState({ actionEnabled: this.props.action.enabled, actionBodies });

    for (let i = 0; i < actionBodies.length; i++) {
      this[`actionContent${i}`].value = actionBodies[i].content;
    }
  }

  submitAction = async (event) => {
    event.preventDefault();
    const type = (this.props.form === 'facebook' || this.state.form === 'twitter')
      ? 'social'
      :  this.props.form;
    const action = this.createAction(type);
    const actionBodies = this.state.actionBodies.map((body) => body.value);

    const success = await this.props.handleSubmit(action, actionBodies);
    
    if(success) {
      this.resetForm(type);
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

    const emptyBody = { id: 0, value: '' };

    this.setState({ actionEnabled: true, actionBodies: [emptyBody] });
  }

  addTextArea = (event) => {
    event.preventDefault();
    let actionBodies = [...this.state.actionBodies];
    let nextBody = { id: actionBodies.length, value: '' };
    actionBodies.push(nextBody);

    this.setState({ actionBodies });
  }

  deleteBody = (event) => {
    event.preventDefault();
    let actionBodies = [...this.state.actionBodies];
    actionBodies = actionBodies.filter((body) => parseInt(body.id) !== parseInt(event.target.dataset.id));

    this.setState({ actionBodies });
  }

  handleTextArea = (i, event) => {
    const actionBodies = [...this.state.actionBodies];
    actionBodies[i].value = event.target.value;

    this.setState({ actionBodies });
  }

  renderTextAreas = () => {
    return this.state.actionBodies.map((body, i) => {
      if (i <= 0) {
        return (
          <div key={`textarea-${i}`} className='textarea'>
            <textarea 
              value={this.state.actionBodies[i].value} 
              onChange={(event) => this.handleTextArea(i, event)} 
              placeholder='Action Body'>
            </textarea>
          </div>
        );
      } else {
        return (
          <div key={`textarea-${i}`} className='textarea'>
            <button onClick={this.deleteBody} data-id={this.state.actionBodies[i].id} className='delete-textarea'>X</button>
            <textarea 
              value={this.state.actionBodies[i].value} 
              onChange={(event) => this.handleTextArea(i, event)} 
              placeholder='Action Body'>
            </textarea>
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

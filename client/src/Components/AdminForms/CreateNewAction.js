import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminForms.css';
import { postAction, postActionContent } from '../../utils/apiCalls';

export class CreateNewAction extends Component {
  constructor() {
    super();
    this.state = {
      form: 'facebook',
      actionEnabled: true,
      actionBodies: 1,
      error: false,
      success: false
    };
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

  actionPost = async (action, type) => {
    // console.log(action)
    const token = this.props.user.id_token;

    const actionID = await postAction(action, type, token);

    if (actionID.id) {
      for (let i = 0; i < this.state.actionBodies; i++) {
        let content = this[`actionContent${i}`].value;
        // console.log(content)

        const contentID = await postActionContent(type, token, actionID, content);
        

        if (contentID.error) {
          this.setState({ error: `Could not create action content: ${contentID.error}`});
          setTimeout(() => {
            this.setState({ error: false });
          }, 5000);
        } else if (contentID.id) {
          return contentID;
        }
      }

    } else if (actionID.error) {
      this.setState({ error: `Could not create action: ${actionID.error}`});
      setTimeout(() => {
        this.setState({ error: false });
      }, 5000);
    }
  }

  handleChange = () => {
    const form = this.actionTypes.value;
    
    this.setState({ form });
  }

  addTextArea = (event) => {
    event.preventDefault();
    let actionBodies = this.state.actionBodies;
    actionBodies += 1;

    this.setState({ actionBodies });
  }

  renderTextAreas = () => {
    const bodies = [];
    for (let i = 1; i <= this.state.actionBodies; i++) {
      bodies.push(i);
    }

    return bodies.map((body, i) => {
      return (
        <textarea key={`textarea-${i}`} ref={(elem) => { this[`actionContent${i}`] = elem; }} placeholder='Action Body'></textarea>
      );
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const type = (this.state.form === 'facebook' || this.state.form === 'twitter')
      ? 'social'
      :  this.state.form;
    const action = this.createAction(type);
    // const actionContent = this.actionContent.value;
    const postResult = await this.actionPost(action, this.state.form);

    if (postResult) {
      this.resetForm(type);
      this.setState({ success: 'ACTION CREATED!' });
      setTimeout(() => {
        this.setState({ success: false });
      }, 5000);
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

    for (let i = 0; i < this.state.actionBodies; i++) {
      let content = this[`actionContent${i}`].value = '';
    }

    this.setState({ actionEnabled: true });
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
      <div className='create-new-action-container'>
        <h1>CREATE A NEW <span>{this.state.form.toUpperCase()}</span> ACTION</h1>
        <section className='select-action-container'>
          <label htmlFor='action-types'>Select Action Type:
          <select onChange={() => this.handleChange()} ref={(elem) => { this.actionTypes = elem; }} name='action-types' id='action-types'>
            <option value='facebook'>Facebook</option>
            <option value='twitter'>Twitter</option>
            <option value='email'>Email</option>
            <option value='phone'>Phone</option>
          </select>
          {
            this.state.error && 
              <h1>{this.state.error}</h1>
          }
          {
            this.state.success &&
              <h1>{this.state.success}</h1>
          }
          </label>
          <section className='create-action-form'>
            <form action='create-new-action-form'>
              <input type='text' ref={(elem) => { this.actionTitle = elem; }} placeholder='Action Title' />
              <input type='text' ref={(elem) => { this.actionDescription = elem; }} placeholder='Action Description' />
              {form[this.state.form].targetUrl}

              {form[this.state.form].to}
              {form[this.state.form].cc}
              {form[this.state.form].bcc}
              {form[this.state.form].subject}

              {form[this.state.form].name}
              {form[this.state.form].position}
              {form[this.state.form].phoneNumber}
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
              <button onClick={this.handleSubmit}>CREATE THIS ACTION</button>
            </form>
          </section>
        </section>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.User
});

export default connect(mapStateToProps, null)(CreateNewAction);
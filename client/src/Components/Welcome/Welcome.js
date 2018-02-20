import React, { Component } from 'react';
import fanLogo from '../../assets/fan-logo.png';
import './Welcome.css';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import * as actions from '../../Actions/';
import { signInUser } from '../../utils/apiCalls';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      errorMessage: null
    };
  }

  handleClick = (prov) => {
    this.setState({ showForm: true });

    const providers = {
      facebook: new firebase.auth.FacebookAuthProvider(), 
      google: new firebase.auth.GoogleAuthProvider(), 
      email: new firebase.auth.EmailAuthProvider()
    };
    // const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(providers[prov]).then( async result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.idToken;
      const user = result.user;

      const { displayName, email, uid } = user;
// 
      const dbUser = await signInUser(uid, displayName, email);
      this.props.validateUser(dbUser);
      this.props.history.push('/home');

    }).catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      this.setState({ 
        errorMessage: <h3>{errorMessage}</h3>
      });

      const email = error.email;
      const credential = error.credential;

      setTimeout(() => {
        this.setState({
          errorMessage: null
        });
      }, 5000);
    });
  }

  render() {
    const signInPrompt = 
      <div className='welcome-controls'>
        <button onClick={() => this.handleClick('google')}>Sign In With Google</button>
        <button onClick={() => this.handleClick('facebook')}>Sign In With Facebook</button>
        <button onClick={() => this.handleClick('email')}>Sign In With Email</button>
      </div>;

    const hiddenButtons = this.state.showForm ? '' : 'hidden';
    const primaryButton = this.state.showForm ? 'none' : 'primary';
    
    const expandOptions = 
    <div className='welcome-controls'>
      <button className={primaryButton} onClick={() => this.setState({showForm: true})}>Sign In</button>
      <button className={hiddenButtons} onClick={() => this.handleClick('google')}>Sign In With Google</button>
      <button className={hiddenButtons} onClick={() => this.handleClick('facebook')}>Sign In With Facebook</button>
      <button className={hiddenButtons} onClick={() => this.handleClick('email')}>Sign In With Email</button>
    </div>
    

    const imgClassName = !this.state.showForm ? 'fan-logo' : 'fan-logo shifted';
    const welcomeClassName = !this.state.showForm ? 'Welcome' : 'Welcome shifted';
    console.log(this.state.showForm);
    return (
      <div className='Welcome shifted'>
        <img className='fan-logo shifted' src={fanLogo} alt='' />
        {expandOptions}
        {this.state.errorMessage}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  validateUser: user => dispatch(actions.updateUser(user))
});



export default connect(null, mapDispatchToProps)(Welcome);
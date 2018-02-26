import React, { Component } from 'react';
import fanLogo from '../../assets/fan-logo.png';
import './Welcome.css';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import * as actions from '../../Actions/';
import { signInUser } from '../../utils/apiCalls';
import { Link } from 'react-router-dom';

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
      google: new firebase.auth.GoogleAuthProvider()
    };
    // const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(providers[prov]).then( async result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.idToken;
      const user = result.user;

      const { displayName, email, uid } = user;

      const dbUser = await signInUser(uid, displayName, email);

      this.props.validateUser(dbUser);
      localStorage.setItem('THL-FAN-USER', JSON.stringify(dbUser));
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
    const hiddenButtons = this.state.showForm ? '' : 'hidden';
    const primaryButton = this.state.showForm ? 'none' : 'primary';
    
    const expandOptions = 
    <div className='welcome-controls'>
      <button className={primaryButton} onClick={() => this.setState({showForm: true})}>Sign In</button>
      <button className={hiddenButtons} onClick={() => this.handleClick('google')}>Sign In With Google</button>
      <button className={hiddenButtons} onClick={() => this.handleClick('facebook')}>Sign In With Facebook</button>
      <button className={hiddenButtons} onClick={() => this.props.history.push('/signin')}>Sign In With Email</button>
    </div>

    const conditionalInfo = this.props.User.name ? <Link to="/home">Dashboard</Link> : expandOptions;

    return (
      <div className='Welcome shifted'>
        <img className='fan-logo shifted' src={fanLogo} alt='' />
        <div>
          <p className="welcome-description">Welcome to The Humane League's Fast Action Network! FAN gives individuals a way to be heard by the largest corporations in the world. Whether it is by signing a petition, sending a tweet, emailing a CEO, or posting a quick comment on Facebook, this team comes together for a few minutes each week to call on companies to end their support of the worst factory farm cruelties, and it works! When activists like yourself come together for animals, the opportunities are endless!</p>
          {conditionalInfo}
          {this.state.errorMessage}
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  User: store.User
});

const mapDispatchToProps = dispatch => ({
  validateUser: user => dispatch(actions.updateUser(user))
});



export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
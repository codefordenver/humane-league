import React from 'react';
import twitterLogo from '../../assets/twitter.png';
import logAction from '../../utils/logAction';

class TwitterCard extends React.Component {
  constructor () {
    super();
    this.state = {
      showMore: null
    }
  }

  fetchBodies = async (contentsTable, action) => {
    const actionBodiesFetch = await fetch(`/api/v1/${contentsTable}`);
    const actionBodies = await actionBodiesFetch.json();

    const bodies = actionBodies.results.filter(body => body.action_id === this.props.action.id);
    const body = bodies[Math.floor(Math.random() * bodies.length)];

    console.log(body);

    this.setState({ showMore: <textarea value={body.content}></textarea> }) ;
  }

  //logAction('twitter_actions', user, action)
  render() {
    const { title, description, target } = this.props.action;
    return (
      <div className="ActionCard twitter-card">
        <div className="action-logo-holder">
          <img className="action-logo" src={twitterLogo} alt="Twitter Symbol"/>
        </div>
        <div className="action-card-main">
          <h3>{title}</h3>
          <p>{description}</p>

          {this.state.showMore}

          <button onClick={() => this.fetchBodies('twitter_contents', this.props.action)}>CLICK TO TWEET</button>
          
         
        </div>
      </div>
    );
  }
}

export default TwitterCard;
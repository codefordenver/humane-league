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

  //
  render() {
    const { title, description, target } = this.props.action;
    const buttonText = this.state.showMore === null ? 'CLICK TO TWEET' : 'TWEET NOW';

    const buttonOnClick = this.state.showMore === null 
      ? () => { this.fetchBodies('twitter_contents', this.props.action) }
      : () => { logAction('twitter_actions', this.props.user, this.props.action) };

    const targetLink = this.state.showMore === null ? null : target;

    const cancelButton = this.state.showMore === null 
      ? null
      : <button onClick={() => this.setState({ showMore: null })}>Cancel</button>;

    return (
      <div className="ActionCard twitter-card">
        <div className="action-logo-holder">
          <img className="action-logo" src={twitterLogo} alt="Twitter Symbol"/>
        </div>
        <div className="action-card-main">
          <h3>{title}</h3>
          <p>{description}</p>

          {this.state.showMore}
          <a href={targetLink} target="_blank">
            <button onClick={ buttonOnClick }>{buttonText}</button>
          </a>
          {cancelButton}
        </div>
      </div>
    );
  }
}

export default TwitterCard;
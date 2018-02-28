import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { UserProfile } from './UserProfile';

describe('UserProfile component tests', () => {
  let renderedUserProfile;
  let defaultState;
  let mockUser; 
  let userPreferences;
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ results: []})
    }));
    userPreferences =  { twitter_actions: false, facebook_actions: false, email_actions: false, phone_actions: false };
    mockUser = { id: 1, name: 'Julie Hawkins', email: 'Julabi@gmail.com', ...userPreferences };
    renderedUserProfile = shallow( <UserProfile user={mockUser}/> );
    defaultState = {
      name: 'Julie Hawkins',
      email: 'Julabi@gmail.com',
      actionCount: 0,
      twitter_actions: false,
      facebook_actions: false,
      email_actions: false,
      phone_actions: false
    };
  });
  it('renders without crashing', () => {
    expect(renderedUserProfile).toBeDefined();
    expect(renderedUserProfile.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedUserProfile).toMatchSnapshot();
  });
});
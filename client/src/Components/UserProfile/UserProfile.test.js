import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { UserProfile } from './UserProfile';

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => 
    Promise.resolve(
      [{ user_id: 1 }]
    )   
}));
describe.skip('UserProfile component tests', () => {
  let renderedUserProfile;
  let defaultState;
  let mockUser; 
  let userPrefereces;
  beforeEach(() => {
    userPrefereces =  { twitter_actions: false, facebook_actions: false, email_actions: false, phone_actions: false };
    mockUser = { id: 1, name: 'Julie Hawkins', email: 'Julabi@gmail.com', ...userPrefereces };
    renderedUserProfile = shallow( <UserProfile user={mockUser}/> );
    defaultState ={
      name: props.user.name,
      email: props.user.email,
      actionCount: true,
      twitter_actions: true,
      facebook_actions: true,
      email_actions: true,
      phone_actions: true
    }

  })
  it('renders without crashing', () => {
    expect(renderedUserProfile).toBeDefined();
    expect(renderedUserProfile.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedUserProfile).toMatchSnapshot();
  })
})
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { ActionContainer } from './ActionContainer';

describe('ActionContainer component tests', () => {
  let renderedActionContainer;
  let defaultState;
  let mockUser;
  let mockAction;
  beforeEach(() => {
    mockUser = { twitter_actions: false, facebook_actions: false, email_actions: false, phone_actions: false };
    renderedActionContainer = shallow( <ActionContainer user={mockUser}/> );
    defaultState = {
      userPreferences: {
        ...mockUser
      },
      loading: true,
      twitter_actions: [],
      facebook_actions: [],
      email_actions: [],
      phone_actions: []
    };
    mockAction = { title: 'action title' };

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => 
        Promise.resolve({
          actions: []
        })   
    }));

  });
  it('renders without crashing', () => {
    expect(renderedActionContainer).toBeDefined();
    expect(renderedActionContainer.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedActionContainer).toMatchSnapshot();
  });
});
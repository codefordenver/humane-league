import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import UserActions from './UserActions';

describe('UserActions component tests', () => {
  let renderedUserActions;
  
  beforeEach(() => {
    renderedUserActions = shallow( <UserActions /> );
  })
  it('renders without crashing', () => {
    expect(renderedUserActions).toBeDefined();
  });
  it('matches SnapShot', () => {
    expect(renderedUserActions).toMatchSnapshot();
  })
})
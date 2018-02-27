import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Welcome } from './Welcome';

describe('Welcome component tests', () => {
  let renderedWelcome;
  let defaultState;
  
  beforeEach(() => {
    renderedWelcome = shallow( <Welcome User={{ name: 'Julie Hawkins' }}/> );
    defaultState = {
      showForm: false,
      errorMessage: null
    }
  })
  it('renders without crashing', () => {
    expect(renderedWelcome).toBeDefined();
    expect(renderedWelcome.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedWelcome).toMatchSnapshot();
  })
})
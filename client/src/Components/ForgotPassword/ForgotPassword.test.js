import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword component tests', () => {
  let renderedForgotPassword;
  let defaultState; 
  
  beforeEach(() => {
    renderedForgotPassword = shallow( <ForgotPassword /> );
    defaultState ={
      email: '',
      status: null
    }
  })
  it('renders without crashing', () => {
    expect(renderedForgotPassword).toBeDefined();
    expect(renderedForgotPassword.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedForgotPassword).toMatchSnapshot();
  })
})
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ResetPassword from './ResetPassword';

describe('ResetPassword component tests', () => {
  let renderedResetPassword;
  let defaultState; 
  
  beforeEach(() => {
    renderedResetPassword = shallow( <ResetPassword /> );
    defaultState ={
      validLink: false,
      password: '',
      confirmPass: '',
      disableButton: true,
      passMatchStatus: null
    }
  })
  it('renders without crashing', () => {
    expect(renderedResetPassword).toBeDefined();
    expect(renderedResetPassword.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedResetPassword).toMatchSnapshot();
  })
})
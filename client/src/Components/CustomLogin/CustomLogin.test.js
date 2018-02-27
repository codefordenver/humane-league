import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { CustomLogin } from './CustomLogin';

describe('CustomLogin component tests', () => {
  let renderedCustomLogin;
  let defaultState = {
    email: '',
    password: '',
    confirmPass: '',
    name: '',
    error: null,
    signin: true,
    passMatchStatus: null,
    disableSubmit: true
  }
  
  beforeEach(() => {
    renderedCustomLogin = shallow( <CustomLogin /> );
  })
  it('renders without crashing', () => {
    expect(renderedCustomLogin).toBeDefined();
    expect(renderedCustomLogin.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedCustomLogin).toMatchSnapshot();
  })
})
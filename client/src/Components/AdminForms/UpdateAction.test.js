import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { UpdateAction } from './UpdateAction';

describe('UpdateAction component tests', () => {
  let renderedUpdateAction;
  let defaultState; 
  
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => 
        Promise.resolve({
          results: []
        })   
    }));
    renderedUpdateAction = shallow( <UpdateAction user={{ name: 'hello', id_token: 'xyz' }}/> );
    defaultState = {
      actionType: 'facebook',
      action: {},
      showForm: false,
      facebook: [],
      twitter: [],
      email: [],
      phone: []
    };

  });
  it('renders without crashing', () => {
    expect(renderedUpdateAction).toBeDefined();
    expect(renderedUpdateAction.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedUpdateAction).toMatchSnapshot();
  });
});
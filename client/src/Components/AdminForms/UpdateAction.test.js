import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { UpdateAction } from './UpdateAction';

describe.skip('UpdateAction component tests', () => {
  let renderedUpdateAction;
  let defaultState; 
  
  beforeEach(() => {
    renderedUpdateAction = shallow( <UpdateAction user={{ name: 'hello' }}/> );
    defaultState = {
      actionType: 'facebook',
      action: {},
      showForm: false,
      facebook: [],
      twitter: [],
      email: [],
      phone: []
    }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => 
        Promise.resolve(
          [{id: 1, title: 'title'}]
        )   
    }));
  })
  it('renders without crashing', () => {
    expect(renderedUpdateAction).toBeDefined();
    expect(renderedUpdateAction.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    // expect(renderedUpdateAction).toMatchSnapshot();
  })
})
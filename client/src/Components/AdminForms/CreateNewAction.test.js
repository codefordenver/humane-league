import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { CreateNewAction } from './CreateNewAction';

describe('CreateNewAction component tests', () => {
  let renderedCreateNewAction;
  let defaultState = {
    "error": false, "form": "facebook", "success": false
  }
  
  beforeEach(() => {
    renderedCreateNewAction = shallow( <CreateNewAction /> );
  })
  it('renders without crashing', () => {
    expect(renderedCreateNewAction).toBeDefined();
    expect(renderedCreateNewAction.state()).toEqual(defaultState);
  });
  it('matches SnapShot', () => {
    expect(renderedCreateNewAction).toMatchSnapshot();
  })
})
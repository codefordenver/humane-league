import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Header component tests', () => {
  let renderedHeader;
  global.localStorage = {
    'THL-FAN-USER': { id: 1 },
    getItem: () => {
      return JSON.stringify({name: 'Thomas', email: '123@mail.com'});
    }
  };
  
  beforeEach(() => {
    renderedHeader = shallow( <Header validateUser={jest.fn()} User={{}}/> );
    
  })
  it('renders without crashing', () => {
    expect(renderedHeader).toBeDefined();
  });
  it('matches SnapShot', () => {
    expect(renderedHeader).toMatchSnapshot();
  });
});
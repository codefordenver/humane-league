import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe.skip('Header component tests', () => {
  let renderedHeader;
  global.localStorage = {
    'THL-FAN-USER': { id: 1 },
    getItem: () => {
       return 'THL-FAN-USER'
    }
  };
  
  beforeEach(() => {
    renderedHeader = shallow( <Header User={{}}/> );
    
  })
  it('renders without crashing', () => {
    expect(renderedHeader).toBeDefined();
  });
  it('matches SnapShot', () => {
    expect(renderedHeader).toMatchSnapshot();
  })
})
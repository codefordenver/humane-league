import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
  json: () => Promise.resolve({
    status: 'Success'
  })
}));

describe('App component tests', () => {
  let renderedApp;

  beforeEach(() => {
    renderedApp = shallow(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  })
  it('renders without crashing', () => {
    expect(renderedApp).toBeDefined();
  });
  
})

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router';

window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
  json: () => Promise.resolve({
    status: 'Success'
  })
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

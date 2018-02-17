import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
  json: () => Promise.resolve({
    status: 'Success'
  })
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

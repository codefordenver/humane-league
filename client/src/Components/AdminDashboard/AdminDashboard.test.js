import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import AdminDashboard from './AdminDashboard';
import Dashboard from './Dashboard';

window.fetch = jest.fn().mockImplementation( () => Promise.resolve({
  json: () => Promise.resolve({
    status: 'Success'
  })
}));

describe('AdminDashboard component tests', () => {
  let renderedAdminDashboard;

  beforeEach(() => {
    renderedAdminDashboard = shallow(
      <MemoryRouter initialEntries={[ { pathname: '/', key: 'testKey' } ]}>
        <AdminDashboard />
      </MemoryRouter>
    )
  })
  it('renders without crashing', () => {
    expect(renderedAdminDashboard).toBeDefined();
  });
  it('matches SnapShot', () => {
    expect(renderedAdminDashboard).toMatchSnapshot();
  }); 
});

describe('Dashboard component tests', () => {
  let renderedDashboard;
  
  beforeEach(() => {
    renderedDashboard = shallow( <Dashboard /> );
  })
  it('renders without crashing', () => {
    expect(renderedDashboard).toBeDefined();
  });
  it('matches SnapShot', () => {
    expect(renderedDashboard).toMatchSnapshot();
  })
})
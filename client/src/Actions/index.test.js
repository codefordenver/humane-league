import * as actions from './index';

describe('actions tests', () => {
  it('should return an action with type UPDATE_USER and expected payload', () => {
    const mockPayload = { user: { name: 'Katie', email: 'katie@gmail.com' } }
    const expectedResponse = {
      type: 'UPDATE_USER',
      payload: mockPayload.user
    };

    expect(actions.updateUser(mockPayload)).toEqual(expectedResponse);
  });

  it('should return an action with type LOGOUT_USER', () => {
    const expectedResponse = {
      type: 'LOGOUT_USER'
    };

    expect(actions.logout()).toEqual(expectedResponse);
  });

  it('should return an action with type UPDATE_PREFS and expected payload', () => {
    const mockPayload = { twitter_actions: true, facebook_actions: true, email_actions: true, phone_actions: true };
    
    const expectedResponse = {
      type: 'UPDATE_PREFS',
      newPrefs: mockPayload
    };

    expect(actions.updatePrefs(mockPayload)).toEqual(expectedResponse);
  });
});
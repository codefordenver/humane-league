import User from '../User';
import * as actions from '../../Actions';

describe('User reducer tests', () => {
  it('returns the correct default state', () => {
    const expectedState = {};

    expect(User(undefined, {})).toEqual(expectedState);
  });

  it('should return the current state when passed a non-existant action', () => {
    const mockState = {
      name: 'Thomas'
    };

    const mockAction = {
      type: 'FAKE_ACTION'
    };

    expect(User(mockState, mockAction)).toEqual(mockState);
  });

  it('should update the user when given the UPDATE_USER action', () => {
    const mockUser = { user: { name: 'Thomas' } };

    expect(User({}, actions.updateUser(mockUser))).toEqual(mockUser.user);
  });

  it('should empty state given a LOGOUT_USER action', () => {
    const expectedState = {};
    const mockUser = {
      name: 'Thomas'
    };
    global.localStorage = {
      'THL-FAN-USER': mockUser,
      removeItem: () => {
        return 'THL-FAN-USER'
      }
    }
    expect(User(mockUser, actions.logout())).toEqual(expectedState);
  });
});
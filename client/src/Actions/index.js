export const exampleAction = payload => ({
  type: 'ACTION_TYPE',
  payload
});

export const updateUser = payload => ({
  type: 'UPDATE_USER',
  payload: payload.user
});

export const logout = () => ({
  type: 'LOGOUT_USER'
});

export const updatePrefs = payload => ({
  type: 'UPDATE_PREFS',
  newPrefs: payload
});


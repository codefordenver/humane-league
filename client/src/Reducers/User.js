const User = (store = {}, action) => {
  switch (action.type) {
  case 'UPDATE_USER':
    return action.payload;
  case 'LOGOUT_USER':
    localStorage.removeItem('THL-FAN-USER');
    return {};
  case 'UPDATE_PREFS':
    return Object.assign({}, store, action.newPrefs);
  default:
    return store;
  }
};

export default User;
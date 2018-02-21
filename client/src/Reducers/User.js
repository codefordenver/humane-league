const User = (store = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER':
      return action.payload;
    case 'LOGOUT_USER':
      return {};
    default:
      return store;
  }
};

export default User;
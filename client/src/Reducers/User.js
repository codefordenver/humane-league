const User = (store = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER':
      return action.payload;
    default:
      return store;
  }
};

export default User;
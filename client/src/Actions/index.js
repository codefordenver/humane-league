export const exampleAction = payload => {
  return {
    type: 'ACTION_TYPE',
    payload
  };
};

export const updateUser = payload => ({
  type: 'UPDATE_USER',
  payload
});
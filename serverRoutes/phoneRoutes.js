const getPhoneActions = (request, response, database) => {
  return database('phone_actions').select()
    .then(actions => {
      return response.status(200).json({ actions });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
};

module.exports = {
  getPhoneActions
};
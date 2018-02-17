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


const getTypeActions = (request, response, database, dbName) => {
  return database(dbName).select()
    .then(actions => {
      return response.status(200).json({ actions });
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
};

const getSpecificAction = (request, response, database, dbName, actionId) => {
  return database(dbName).select().where('id', actionId)
    .then(action => {

    })
};

const postNewActions = (request, response, database, dbName, requiredParams) => {

}
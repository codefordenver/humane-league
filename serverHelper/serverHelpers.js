const getAllHelper = (request, response, database, table) => {
  return database(table).select()
    .then(results => {
      return response.status(200).json({ results });
    })
    .catch(err => {
      return response.status(500).json({ error: `Could not fetch items from ${table}. ${err}.` });
    });
};

const getOneHelper = (request, response, database, table) => {
  const { id } = request.params;

  return database(table).where('id', id).first()
    .then(result => {
      if (!result) {
        return response.status(404).json({error: `Could not find item with id ${id} in ${table}.`});
      }
      return response.status(200).json({ result });
    })
    .catch(err => {
      return response.status(500).json({ error: `Could not fetch item from ${table}. ${err}.`});
    });
};

const postHelper = (request, response, database, table, reqParams) => {
  for (let reqParam of reqParams) {
    if (!request.body.hasOwnProperty(reqParam)) {
      return response.status(422).json({ error: `You are missing the required parameter ${reqParam}.` });
    }
  }

  return database(table).insert(request.body, 'id')
    .then(id => {
      return response.status(201).json({ id: id[0] });
    })
    .catch(err => {
      return response.status(500).json({ error: `Could not add item to ${table}.`});
    });
};

const patchHelper = async (request, response, database, table, reqParams) => {
  const { id } = request.params;

  return database(table).where('id', id).update(request.body, 'id')
    .then(id => {
      if (!id) {
        return response.status(422).json({ error: `No entry found with ID ${id} in ${table}.` });
      }
      return response.sendStatus(204);
    })
    .catch(err => {
      return response.status(500).json({ error: `Error updating entry ${id} in ${table}` });
    })
};



module.exports = {
  getAllHelper,
  getOneHelper,
  postHelper,
  patchHelper
};
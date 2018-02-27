const routes = require('./serverHelper/serverHelpers');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const requireHTTPS = (request, response, next) => {
  if (request.headers['x-forwarded-proto'] !== 'https') {
    return response.redirect('https://' + request.get('host') + request.url);
  }
  next();
};

if (process.env.NODE_ENV === 'production') {
  app.use(requireHTTPS);
}

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

app.listen(app.get('port'), () => {
  console.log(`FAN server running on ${app.get('port')} in ENV ${environment}.`);
});

app.use('/', express.static(`${__dirname}/client/build`));

const params = {
  content:     ['action_id', 'content'],
  log:         ['user_id', 'action_type', 'action_id'],
  socialMedia: ['enabled', 'title', 'description', 'target'],
  phone:       ['enabled', 'title', 'description', 'name', 'phone_number'],
  email:       ['enabled', 'title', 'description', 'subject', 'to'],
  users:       ['facebook_actions', 'twitter_actions', 'email_actions', 'phone_actions', 'admin', 'name']
};

const endpoints = [
  { table: 'action_log',        all: '/api/v1/actions',           one: '/api/v1/actions/:id',           reqParams: params.log,         getSecurity: false,  updateSecurity: false   },
  { table: 'twitter_actions',   all: '/api/v1/twitter_actions',   one: '/api/v1/twitter_actions/:id',   reqParams: params.socialMedia, getSecurity: false, updateSecurity: true    },
  { table: 'twitter_contents',  all: '/api/v1/twitter_contents',  one: '/api/v1/twitter_contents/:id',  reqParams: params.content,     getSecurity: false, updateSecurity: true    },
  { table: 'facebook_actions',  all: '/api/v1/facebook_actions',  one: '/api/v1/facebook_actions/:id',  reqParams: params.socialMedia, getSecurity: false, updateSecurity: true    },
  { table: 'facebook_contents', all: '/api/v1/facebook_contents', one: '/api/v1/facebook_contents/:id', reqParams: params.content,     getSecurity: false, updateSecurity: true    },
  { table: 'phone_actions',     all: '/api/v1/phone_actions',     one: '/api/v1/phone_actions/:id',     reqParams: params.phone,       getSecurity: false, updateSecurity: true    },
  { table: 'phone_contents',    all: '/api/v1/phone_contents',    one: '/api/v1/phone_contents/:id',    reqParams: params.content,     getSecurity: false, updateSecurity: true    },
  { table: 'email_actions',     all: '/api/v1/email_actions',     one: '/api/v1/email_actions/:id',     reqParams: params.email,       getSecurity: false, updateSecurity: true    },
  { table: 'email_contents',    all: '/api/v1/email_contents',    one: '/api/v1/email_contents/:id',    reqParams: params.content,     getSecurity: false, updateSecurity: true    },
  { table: 'users',             all: '/api/v1/users',             one: '/api/v1/users/:id',             reqParams: params.users,       getSecurity: true,  updateSecurity: 'other' }
];

const validateAdmin = async (request, response, next) => {
  const userToken = request.query.token;
  if (!userToken) {
    return response.status(422).json({error: 'Please send a valid user token'});
  }
  
  const user = await database('users').where('id_token', userToken).first().then(user => user);

  if (!user) {
    console.log('here');
    return response.status(404).json({error: `No user found with token ${userToken}.`});
  }

  if (!user.admin) {
    return response.status(401).json({error: 'User not authorized to view this resource'});
  }

  next();
}

const patchValidation = async (request, response, next) => {
  console.log('patching')
  const { id } = request.params;
  const { body } = request;
  const userToken = request.query.token;

  if (!userToken) {
    return response.status(422).json({error: 'Please send a valid user token'});
  }

  const user = await database('users').where('id_token', userToken).first().then(user => user);

  if (id != user.id && !user.super_admin) {
    return response.status(401).json({error: 'Only super admins can edit users besides themselves!'});
  }

  if (!user.super_admin && body.admin) {
    return response.status(401).json({error: 'You are not authorized to change the admin status'});
  }

  if (body.super_admin || body.id_token) {
    return response.status(401).json({error: 'Nobody can change super_admin or id_tokens in the users table!'});
  }

  next();  
}

//unsecured endpoints
endpoints.filter(endpoint => !endpoint.getSecurity).map( endpoint => {
  const {table, all } = endpoint;
  return app.get(all, (req, res) => {
    return routes.getAllHelper(req, res, database, table);
  });
});

//secured endpoints
endpoints.filter(endpoint => endpoint.getSecurity).map( endpoint => {
  const {table, all } = endpoint;
  return app.get(all, validateAdmin, (req, res) => {
    return routes.getAllHelper(req, res, database, table);
  });
});

//get one - all secured
endpoints.map( endpoint => {
  const {table, one } = endpoint;
  return app.get(one, validateAdmin, (req, res) => {
    return routes.getOneHelper(req, res, database, table);
  });
});

//unsecured posts
endpoints.filter(endpoint => !endpoint.updateSecurity).map( endpoint => {
  const {table, all, reqParams} = endpoint;
  return app.post(all, (req, res) => {
    return routes.postHelper(req, res, database, table, reqParams);
  });
});

//secured posts
endpoints.filter(endpoint => endpoint.updateSecurity === true).map( endpoint => {
  const {table, all, reqParams} = endpoint;
  return app.post(all, validateAdmin, (req, res) => {
    return routes.postHelper(req, res, database, table, reqParams);
  });
});

endpoints.filter(endpoint => endpoint.updateSecurity === 'other').map( endpoint => {
  const {table, all, reqParams} = endpoint;
  return app.post(all, validateAdmin, (req, res) => {
    return routes.postHelper(req, res, database, table, reqParams);
  });
})


//secured patch endpoints
endpoints.filter(endpoint => endpoint.updateSecurity === true).map( endpoint => {
  const {table, one, reqParams} = endpoint;
  return app.patch(one, validateAdmin, (req, res) => {
    return routes.patchHelper(req, res, database, table, reqParams);
  });
});

endpoints.filter(endpoint => !endpoint.updateSecurity).map( endpoint => {
  const {table, one, reqParams} = endpoint;
  return app.patch(one, validateAdmin, (req, res) => {
    return routes.patchHelper(req, res, database, table, reqParams);
  });
});

//restricted user endpoint
app.patch(endpoints[endpoints.length - 1].one, patchValidation, (req, res) => {
  return routes.patchHelper(req, res, database, 'users', endpoints[endpoints.length-1].params);
});

app.get('/api/v1/authenticate', async (request, response) => {
  try {
    const user = await findUser(request.query.token);

    if (!user) {
      return handleNewUser(request, response);
    }

    return response.status(200).json({ user });
  } catch(err) {
    return response.status(500).json({ error: `Error retrieving user: ${err}.`});
  }
});

const findUser = (token) => {
  return database('users').where('id_token', token).select()
    .then(users => {
      if (users.length) {
        return users[0];
      }
    });
};

const handleNewUser = (request, response) => {
  const { token, email, name } = request.query;
  const user = { 
    id_token: token, 
    email, 
    name, 
    admin: false, 
    twitter_actions: true, 
    facebook_actions: true, 
    email_actions: true, 
    phone_actions: true,
    super_admin: false
  };

  return database('users').returning(['id', 'twitter_actions', 'facebook_actions', 'email_actions', 'phone_actions', 'admin', 'name', 'id_token']).insert(user)
    .then(newUser => {
      return response.status(200).json({user: newUser[0]});
    })
    .catch(err => {
      return response.status(500).json({ error: `Error adding new user - ${err}.` });
    });
};

app.get('/api/v1/users/actions/:id', patchValidation, (request, response) => {
  return database('action_log').where('user_id', request.params.id).select()
    .then(actions => {
      return response.status(200).json({ actions });
    })
    .catch(err => {
      return response.status(500).json({ error: err });
    })
});

module.exports = app;
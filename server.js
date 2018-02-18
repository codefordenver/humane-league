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
  log:         ['user_id', 'action_type', 'action_id', 'description'],
  socialMedia: ['enabled', 'title', 'description', 'target'],
  phone:       ['enabled', 'title', 'description', 'name', 'phone_number'],
  email:       ['enabled', 'title', 'description', 'subject', 'to'],
  users:       ['facebook_actions', 'twitter_actions', 'email_actions', 'phone_actions', 'admin', 'name']
};

const endpoints = [
  { table: 'action_log',        all: '/api/v1/actions',           one: '/api/v1/actions/:id',           reqParams: params.log         }, 
  { table: 'twitter_actions',   all: '/api/v1/twitter_actions',   one: '/api/v1/twitter_actions/:id',   reqParams: params.socialMedia }, 
  { table: 'twitter_contents',  all: '/api/v1/twitter_contents',  one: '/api/v1/twitter_contents/:id',  reqParams: params.content     }, 
  { table: 'facebook_actions',  all: '/api/v1/facebook_actions',  one: '/api/v1/facebook_actions/:id',  reqParams: params.socialMedia },
  { table: 'facebook_contents', all: '/api/v1/facebook_contents', one: '/api/v1/facebook_contents/:id', reqParams: params.content     },
  { table: 'phone_actions',     all: '/api/v1/phone_actions',     one: '/api/v1/phone_actions/:id',     reqParams: params.phone       }, 
  { table: 'phone_contents',    all: '/api/v1/phone_contents',    one: '/api/v1/phone_contents/:id',    reqParams: params.content     }, 
  { table: 'email_actions',     all: '/api/v1/email_actions',     one: '/api/v1/email_actions/:id',     reqParams: params.email       }, 
  { table: 'email_contents',    all: '/api/v1/email_contents',    one: '/api/v1/email_contents/:id',    reqParams: params.content     }, 
  { table: 'users',             all: '/api/v1/users',             one: '/api/v1/users/:id',             reqParams: params.users       }
];


endpoints.map( endpoint => {
  const {table, all } = endpoint;
  return app.get(all, (req, res) => {
    return routes.getAllHelper(req, res, database, table);
  });
});

endpoints.map( endpoint => {
  const {table, one } = endpoint;
  return app.get(one, (req, res) => {
    return routes.getOneHelper(req, res, database, table);
  });
});

endpoints.map( endpoint => {
  const {table, all, reqParams} = endpoint;
  return app.post(all, (req, res) => {
    return routes.postHelper(req, res, database, table, reqParams);
  });
});

endpoints.map( endpoint => {
  const {table, one} = endpoint;
  return app.patch(one, (req, res) => {
    return routes.patchHelper(req, res, database, table);
  });
});


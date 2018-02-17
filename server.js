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

app.get('/test', (req, res) => {
  return res.status(200).json({status:'Successfully hit server endpoint!'})
})
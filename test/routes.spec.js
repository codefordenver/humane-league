process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

chai.use(chaiHttp);

describe('Server routes', () => {
  beforeEach( (done) => {
    knex.seed.run()
      .then( () => {
        done();
      });
  });
  describe('get all items routes', () => {
    const routes = [
      { table: 'action_log',        route: '/api/v1/actions',           length: 0}, 
      { table: 'twitter_actions',   route: '/api/v1/twitter_actions',   length: 1}, 
      { table: 'twitter_contents',  route: '/api/v1/twitter_contents',  length: 3}, 
      { table: 'facebook_actions',  route: '/api/v1/facebook_actions',  length: 1},
      { table: 'facebook_contents', route: '/api/v1/facebook_contents', length: 3},
      { table: 'phone_actions',     route: '/api/v1/phone_actions',     length: 1}, 
      { table: 'phone_contents',    route: '/api/v1/phone_contents',    length: 3}, 
      { table: 'email_actions',     route: '/api/v1/email_actions',     length: 1}, 
      { table: 'email_contents',    route: '/api/v1/email_contents',    length: 3}, 
      { table: 'users',             route: '/api/v1/users',             length: 3}
    ];

    routes.map( route => {
      return it(`Should get all items from the ${route.table} table`, () => {
        return chai.request(server)
          .get(route.route)
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.results.should.be.a('array');
            response.body.results.length.should.equal(route.length);
          });
      });
    });
  });

  describe('get one item routes', () => {
    const routes = [
      { table: 'action_log',        route: '/api/v1/actions/1',           length: 0}, 
      { table: 'twitter_actions',   route: '/api/v1/twitter_actions/1',   length: 1}, 
      { table: 'twitter_contents',  route: '/api/v1/twitter_contents/1',  length: 3}, 
      { table: 'facebook_actions',  route: '/api/v1/facebook_actions/1',  length: 1},
      { table: 'facebook_contents', route: '/api/v1/facebook_contents/1', length: 3},
      { table: 'phone_actions',     route: '/api/v1/phone_actions/1',     length: 1}, 
      { table: 'phone_contents',    route: '/api/v1/phone_contents/1',    length: 3}, 
      { table: 'email_actions',     route: '/api/v1/email_actions/1',     length: 1}, 
      { table: 'email_contents',    route: '/api/v1/email_contents/1',    length: 3}, 
      { table: 'users',             route: '/api/v1/users/1',             length: 3}
    ];

    routes.map( route => {
      return it(`Should get the item with the id 1 from the ${route.table} table`, () => {
        return chai.request(server)
          .get(route.route)
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
          });
      });
    });
  });
});
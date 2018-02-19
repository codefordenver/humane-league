process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

const props = {
  action:       ['id', 'user_id', 'action_id', 'action_type', 'description', 'created_at', 'updated_at'],
  socialAction: ['id', 'enabled', 'title', 'description', 'target', 'created_at', 'updated_at'],
  contents:     ['id', 'action_id', 'content'],
  phoneAction:  ['id', 'enabled', 'title', 'description', 'name', 'position', 'phone_number', 'created_at', 'updated_at'],
  emailAction:  ['id', 'enabled', 'title', 'description', 'to', 'cc', 'bcc', 'subject', 'created_at', 'updated_at'],
  user:         ['id', 'twitter_actions', 'facebook_actions', 'email_actions', 'phone_actions', 'admin', 'name', 'id_token']
};


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
      { table: 'action_log',        route: '/api/v1/actions',           expectedProps: props.action,       length: 1}, 
      { table: 'twitter_actions',   route: '/api/v1/twitter_actions',   expectedProps: props.socialAction, length: 1}, 
      { table: 'twitter_contents',  route: '/api/v1/twitter_contents',  expectedProps: props.contents,     length: 3}, 
      { table: 'facebook_actions',  route: '/api/v1/facebook_actions',  expectedProps: props.socialAction, length: 1},
      { table: 'facebook_contents', route: '/api/v1/facebook_contents', expectedProps: props.contents,     length: 3},
      { table: 'phone_actions',     route: '/api/v1/phone_actions',     expectedProps: props.phoneAction,  length: 1}, 
      { table: 'phone_contents',    route: '/api/v1/phone_contents',    expectedProps: props.contents,     length: 3}, 
      { table: 'email_actions',     route: '/api/v1/email_actions',     expectedProps: props.emailAction,  length: 1}, 
      { table: 'email_contents',    route: '/api/v1/email_contents',    expectedProps: props.contents,     length: 3}, 
      { table: 'users',             route: '/api/v1/users',             expectedProps: props.user,         length: 3}
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
            response.body.results.forEach( (result, index) => {
              route.expectedProps.forEach( prop => {
                result.should.have.property(prop);
              });
            });
          });
      });
    });
  });

  describe('get one item routes', () => {
    const routes = [
      { table: 'action_log',        route: '/api/v1/actions/1',           expectedProps: props.action         }, 
      { table: 'twitter_actions',   route: '/api/v1/twitter_actions/1',   expectedProps: props.socialAction         }, 
      { table: 'twitter_contents',  route: '/api/v1/twitter_contents/1',  expectedProps: props.contents         },
      { table: 'facebook_actions',  route: '/api/v1/facebook_actions/1',  expectedProps: props.socialAction         },
      { table: 'facebook_contents', route: '/api/v1/facebook_contents/1', expectedProps: props.contents         },
      { table: 'phone_actions',     route: '/api/v1/phone_actions/1',     expectedProps: props.phoneAction         }, 
      { table: 'phone_contents',    route: '/api/v1/phone_contents/1',    expectedProps: props.contents         }, 
      { table: 'email_actions',     route: '/api/v1/email_actions/1',     expectedProps: props.emailAction         }, 
      { table: 'email_contents',    route: '/api/v1/email_contents/1',    expectedProps: props.contents         }, 
      { table: 'users',             route: '/api/v1/users/1',             expectedProps: props.user         }
    ];

    routes.map( route => {
      return it(`Should get the item with the id 1 from the ${route.table} table`, () => {
        return chai.request(server)
          .get(route.route)
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            route.expectedProps.forEach( prop => {
              response.body.result.should.have.property(prop);
            });
          });
      });
    });

    const badRoutes = [
      { table: 'action_log',        route: '/api/v1/actions/1000000',           }, 
      { table: 'twitter_actions',   route: '/api/v1/twitter_actions/1000000',   }, 
      { table: 'twitter_contents',  route: '/api/v1/twitter_contents/1000000',  },
      { table: 'facebook_actions',  route: '/api/v1/facebook_actions/1000000',  },
      { table: 'facebook_contents', route: '/api/v1/facebook_contents/1000000', },
      { table: 'phone_actions',     route: '/api/v1/phone_actions/1000000',     }, 
      { table: 'phone_contents',    route: '/api/v1/phone_contents/1000000',    }, 
      { table: 'email_actions',     route: '/api/v1/email_actions/1000000',     }, 
      { table: 'email_contents',    route: '/api/v1/email_contents/1000000',    }, 
      { table: 'users',             route: '/api/v1/users/1000000',             }
    ];

    badRoutes.map( route => {
      return it(`Should return a 404 given an item ID that does not exist in the ${route.table} table`, () => {
        return chai.request(server)
          .get(route.route)
          .then(() => {

          })
          .catch(err => {
            err.response.should.have.status(404);
            err.response.body.should.have.property('error'); 
            err.response.body.error.should.match(RegExp(route.table)); 
          });
      });
    });
  });

  describe('patch one item routes', () => {
    const contentUpdate = { content: 'updated content from patch test.' };
    const actionUpdate = { description: 'updated description from patch test.' };
    const userUpdate = { twitter_actions: false };

    const routes = [
      { table: 'twitter_contents',  route: '/api/v1/twitter_contents/1',  body: contentUpdate },
      { table: 'facebook_contents', route: '/api/v1/facebook_contents/1', body: contentUpdate },
      { table: 'phone_contents',    route: '/api/v1/phone_contents/1',    body: contentUpdate }, 
      { table: 'email_contents',    route: '/api/v1/email_contents/1',    body: contentUpdate },
      { table: 'email_actions',     route: '/api/v1/email_actions/1',     body: actionUpdate  }, 
      { table: 'facebook_actions',  route: '/api/v1/facebook_actions/1',  body: actionUpdate  },
      { table: 'twitter_actions',   route: '/api/v1/twitter_actions/1',   body: actionUpdate  }, 
      { table: 'phone_actions',     route: '/api/v1/phone_actions/1',     body: actionUpdate  }, 
      { table: 'action_log',        route: '/api/v1/actions/1',           body: actionUpdate  },
      { table: 'users',             route: '/api/v1/users/1',             body: userUpdate    }
    ];  

    routes.map( route => {
      return it(`Should patch the item with the id 1 from the ${route.table} table`, () => {
        return chai.request(server)
          .patch(route.route)
          .send(route.body)
          .then(response => {
            response.should.have.status(204);
          });
      });
    });  

    const badUpdate = { badProp: 'should not update' };
    const badRoutes = [
      { table: 'twitter_contents',  route: '/api/v1/twitter_contents/1',  body: badUpdate },
      { table: 'facebook_contents', route: '/api/v1/facebook_contents/1', body: badUpdate },
      { table: 'phone_contents',    route: '/api/v1/phone_contents/1',    body: badUpdate }, 
      { table: 'email_contents',    route: '/api/v1/email_contents/1',    body: badUpdate },
      { table: 'email_actions',     route: '/api/v1/email_actions/1',     body: badUpdate }, 
      { table: 'facebook_actions',  route: '/api/v1/facebook_actions/1',  body: badUpdate },
      { table: 'twitter_actions',   route: '/api/v1/twitter_actions/1',   body: badUpdate }, 
      { table: 'phone_actions',     route: '/api/v1/phone_actions/1',     body: badUpdate }, 
      { table: 'action_log',        route: '/api/v1/actions/1',           body: badUpdate },
      { table: 'users',             route: '/api/v1/users/1',             body: badUpdate }
    ];  
    

    badRoutes.map( route => {
      return it(`Should not update an item with a non-existent prop from the ${route.table} table`, () => {
        return chai.request(server)
          .patch(route.route)
          .send(route.body)
          .then(() => {
            
          })
          .catch(err => {
            err.response.should.have.status(500);
            err.response.should.be.json;
            err.response.body.should.have.property('error'); 
            err.response.body.error.should.equal(`Error updating entry 1 in ${route.table}`)
          })
      });
    });
    
    

      

    
  });
});
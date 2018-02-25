# Fast Action Network App for The Humane League

## Project Setup
* Clone down this repo and cd into the project directory.
* `npm install` in the root directory.
* Go into the client directory with `cd client`.
* `npm install`inside the client directory.
* Cd back into the root project directory with `cd ..`.
* Create the dev database with `createdb fan`
* Create the test database with `createdb fan_test`
* Run the DB migrations with `knex migrate:latest` (dev) and `knex migrate:latest --env test` (test)

## Development
* Start the server with `yarn dev`.

## Testing
* Server side tests are run from the root directory with `npm test`
* Client side tests are run from the client directory (`cd client`) with `npm test`

The project should now be available on localhost:3000, with API fetches being made to localhost:5000.

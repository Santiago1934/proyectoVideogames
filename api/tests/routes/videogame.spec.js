/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);

const videogame = {
  id:"a1",
  name: 'Super Mario Bros',
  description:"One of the best games",
  plataforms:"PS2",
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/games/myGames').expect(200));
    it('respond with an object', () =>
      agent.get('/games/myGames').then(res => {
        expect(typeof res.body[0]).to.be.equal("object")}));
      });
    it('the object contains properties', () =>
      agent.get('/games/myGames').then(res => {
        expect(Object.keys(res.body[0]).length).to.be.equal(6)}));
});

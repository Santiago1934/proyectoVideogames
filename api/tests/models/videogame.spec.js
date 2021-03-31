const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('name can not be an empty string', () => {
        (done) => {
          Videogame.create({name : ""})
            .then(() => done(new Error('It requires a valid name, can not be an empty string')))
            .catch(() => done());
        };
      });
    });
    describe('description', () => {
      it('should throw an error if description is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('it should throw an error if the description contains less than 10 characters', (done) => {
        Videogame.create({description:"my name is"})
          .then(() => done(new Error('It requires a valid description, at least 10 characters')))
          .catch(() => done());
      });
     
    describe('plataforms', () => {
      it('should throw an error if plataforms is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid plataform')))
          .catch(() => done());
      });
    });
  });
})});

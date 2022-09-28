const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({ summary: '' })
          .then(() => done(new Error('It requires a valid title')))
          .catch(() => done());
      });
      it('should throw an error if summary is null', (done) => {
        Recipe.create({ title: '' })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid title and valid summary', () => {
        Recipe.create({ title: 'Onions Soup', summary: 'Onions soup from France' });
      });

      it('should throw an error if instructions is not array', (done) => {
        Recipe.create({ title: 'Onions Soup', summary: 'Onions soup from France', instructions: 5 })
          .then(() => done(new Error('It requires a valid diets')))
          .catch(() => done());
      });
    });
  });
});

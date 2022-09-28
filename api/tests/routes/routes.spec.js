
const { expect } = require('chai');
const chai = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const agent = session(app);
const recipe = { title: 'Onions Soup', summary: 'Onions soup from France', diet:['vegan'] };


const req = (method, status, body = null, path = '/recipes') => {
  const property = method.toLowerCase();
  let r = chai.request(app.server)[property](path);

  if (body) {
    request = r.send(body);
  }

  return request
    .catch((err) => {
      // For status codes like 404, 500, and 422, the promise fails and contains
      // a response property in the error object. We want to rescue these cases
      // and return the response object normally. That way we can have a single
      // handler that checks status properly in all cases.
      if (err.response) {
        return err.response;
      }
      throw err;
    })
    .then((res) => {
      expectStatus(status, res, method);
      return res.body;
    });
};

const addRecipe = (rec) => {
  return req('POST', 200, rec).then((newRecipe) => {
    expect(newRecipe).to.have.property('title').that.equals(rec.title);
    expect(newRecipe).to.have.property('summary').that.equals(rec.summary);
    expect(newRecipe).to.have.property('id')
    rec.id = newRecipe.id;
    return rec;
  });
};

xdescribe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((e) => {
      console.error('Unable to connect to the database:', e);
    }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)))
  describe('GET/recipes', () => {
    it('should get 200 if there is not query params', () =>
      agent.get('/recipes').expect(200)
    );
    it('should get 200 if recive a valid "title" by query', async () => 
    {let r = await Recipe.create(recipe);
    agent.get(`/recipes?title=${r.title}`).expect(200)})
    it('should get 404 if recive a not valid "title" by query', async () => 
    {let r = await Recipe.create(recipe);
    agent.get('/recipesfsfd?t2').expect(404)})
    //repetir para diet=vegan y soryBy=titleAsc
  });


  describe('GET/recipes/:id', () => {
    it('should get 200 if get "id" by params', async () => {
      let r = await Recipe.create(recipe);
      agent.get(`/recipes/${r.id}`).expect(404)
    })
    it('should get 404 if "id" does not exist', async () => {
      agent.get(`/recipes/6561`).expect(404)
    })
  });


  describe('POST/recipes', () => {
    it('should add a new post', async () => {
      let newRecipe = await addRecipe(recipe);
      expect(newRecipe).to.deep.equal(r)
    })
    
  });
});

const supertest = require('supertest-as-promised')(require('../../src/app'));
const expect = require('chai').expect
// const model = require('../models/model')
const { Recipe, Diet, conn } = require('../../src/db.js');
const recipe = { title: 'Onions Soup', summary: 'Onions soup from France', diets: ['vegan'] };

describe('/recipes', function () {
  beforeEach(() => Recipe.sync({ force: true }))


  it('GET respond with an error if the recipe title does not exist', async function () {
    let newRecipe = await Recipe.create(recipe)
    return supertest
      .get('/recipes?title=sgdsdg')
      .expect(404)
      .expect(function (res) {
        expect(res.error.text).to.eql('There are no recipes with that name')
      })
  })

  it('GET respond with a status 200 with a valid query title', async function () {
    let newRecipe = await Recipe.create(recipe)
    return supertest
      .get(`/recipes?title=${newRecipe.title}`)
      .expect(200)
  })

  it('GET respond with a status 200 with a valid query diet',  function () {
    return supertest
      .get(`/recipes?diet=vegan`)
      .expect(200)
  })

  it('GET respond with a status 200 with a valid query sortBy',  function () {
    return supertest
      .get(`/recipes?sortBy=titleAsc`)
      .expect(200)
  })

  it('POST add a new recipe', function () {
    return supertest
      .post('/recipes')
      .send(recipe)
      .expect(200)
      .expect(function (res) {
        expect(res.text).to.eql('Recipe created successfully')
      })
  })

  it('POST should not add a new recipe if is title is not defined', function () {
    return supertest
      .post('/recipes')
      .send({})
      .expect(500)
      .expect(function (res) {
        expect(res.error.text).to.eql('Error: title should be defined')
      })
  })

  it('POST should not add a new recipe if is summary is not defined', function () {
    return supertest
      .post('/recipes')
      .send({ title: 'onion' })
      .expect(500)
      .expect(function (res) {
        expect(res.error.text).to.eql('Error: summary should be defined')
      });
  });

  });
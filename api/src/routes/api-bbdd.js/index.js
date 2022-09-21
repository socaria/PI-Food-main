const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require("../../db.js");
const { YOUR_API_KEY } = process.env;
const mockJSON = require('../../../mock/search.json');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {

    // const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    // const apiInfo = await apiUrl.data.results
    const apiInfo = mockJSON.results
        .map(e => { 
            return {
                title: e.title,
                id: e.id,
                summary: e.summary,
                healthScore: e.healthScore,
                instructions: e.analyzedInstructions.map(a => {
                    return a.steps.map(as => {
                        return as.step
                    })
                }).flat(),
                createdInDb: false,
                diets: e.diets.map(d => { return {name: d} }),
                image: e.image,
                dishTypes: e.dishTypes
            }; 
        });
  return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoConcat = apiInfo.concat(dbInfo);
    return infoConcat;
}

module.exports = getAllRecipes;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require("../db");
// const { YOUR_API_KEY } = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=bd985e8724ec4f8cbf1fb32f82f02737&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results
    .map(e => {
        return {
            title: e.title,
            id: e.id, 
            summary: e.summary,
            healthScore: e.healthScore,
            instructions: e.analyzedInstructions.map(a => {return a.steps}),
            createdInDb: false,
        };
    });
    console.log(apiInfo[0]);
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

router.get('/recipes', async (req, res) => {
    const { title } = req.query;
    let recipesTotal = await getAllRecipes();
    if (title) {
        let recipeTitle = await recipeTitle.filter( 
            r => r.title.toLowerCase().includes(title.toLowerCase()));
        recipeTitle.length ? 
        res.status(200).send(recipeTitle) :
        res.status(404).send('No existen recetas con ese nombre');
    }else{
        res.status(200).send(recipesTotal);
    }
})

module.exports = router;

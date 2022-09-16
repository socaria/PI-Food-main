const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require("../db");
const { YOUR_API_KEY } = process.env;
const router = Router();
const mockJSON = require('../../mock/search.json');
//TODO modularizar
//TODO ver por qué las dietas a veces se duplican


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

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    let recipesTotal = await getAllRecipes();
    let recipeId = await recipesTotal.filter(r => r.id == id)?.[0]
    if (recipeId.length !== 0) {
        res.status(200).send(recipeId);
    } else {
        res.status(404).send('No existen recetas con ese Id');
    }
});

router.get('/recipes', async (req, res) => {
    const { title } = req.query;
    try {
        let recipesTotal = await getAllRecipes();
        if (title) {
            let recipeTitle = await recipesTotal.filter(
                r => r.title.toLowerCase().includes(title.toLowerCase()));

            recipeTitle.length
                ? res.status(200).send(recipeTitle)
                : res.status(404).send('No existen recetas con ese nombre');
        } else {
            res.status(200).send(recipesTotal);
        }
    } catch(e) {
        console.log('ERRORRRRRRRRRRRRRRRRRRRRRRRR:', e);
    }
});

router.get('/diets', async (req, res) => {
    const recipesTotal = await getAllRecipes();
    
    const dietsTotal = recipesTotal.map(rt => {
        return rt.diets
    }).flat();    
    dietsTotal.forEach(d => {
        Diet.findOrCreate({
            where: { name: d.name }
        })
    });
    const allDiets = await Diet.findAll();
    console.log("🚀 ~ file: index.js ~ line 100 ~ router.get ~ allDiets", allDiets)
    res.send(allDiets);
})

router.post('/recipes', async (req, res) => {
    let {
        title,
        summary,
        healthScore,
        instructions,
        createdInDb,
        diets
    } = req.body;
    console.log("🚀 ~ file: index.js ~ line 112 ~ router.post ~ diets", diets)
    try {
        let newRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            instructions,
            createdInDb,
        })

        let dietDb = await Diet.findAll({
            where: { name: diets }
        })
        newRecipe.addDiets(dietDb);
        res.send('Receta creada con éxito');

    } catch (e) {
        // TODO: enviar mensaje de error
        res.status(500).send(`ERROR: ${e}`)
    }
})
module.exports = router;

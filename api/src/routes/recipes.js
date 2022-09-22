const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const router = Router();
const mockJSON = require('../../mock/search.json');
const getAllRecipes = require('./api-bbdd.js')

//TODO realizar validaciones de back-end
//TODO ver por qué las dietas a veces se duplican
//TODO validar datos
//TODO hacer paginado para obtener recetas
//TODO hacer ruta delete y put


router.get('/sort/:value', async (req, res, next) => {
    const { value } = req.params;

    try {
        if (value) {
            let recipesTotal = await getAllRecipes();
            let recipesSorted = await recipesTotal.sort(function (a, b) {
                if (value === 'titleAsc' || value === 'titleDesc') {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        if (value === 'titleAsc') return 1;
                        return -1;
                    }
                    if (b.title.toLowerCase() > a.title.toLowerCase()) {
                        if (value === 'titleAsc') return -1;
                        return 1;
                    }
                    return 0;
                }else if (value === 'healthScoreAsc' || value === 'healthScoreDesc') {
                    if (a.healthScore > b.healthScore) {
                        if (value === 'healthScoreAsc') return 1;
                        return -1;
                    }
                    if (b.healthScore > a.healthScore) {
                        if (value === 'healthScoreAsc') return -1;
                        return 1;
                    }
                    return 0;
                }

            })
            res.status(200).send(recipesSorted);
        }
    } catch (e) {

        next(e)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let recipesTotal = await getAllRecipes();
    let recipeId = await recipesTotal.filter(r => r.id == id)?.[0]
    if (recipeId) {
        res.status(200).send(recipeId);
    } else {
        res.status(404).json('No existen recetas con ese Id');
    }
});

router.get('/filter/:diet', async (req, res, next) => {
    const { diet } = req.params;

    try {
        if (diet) {
            let recipesTotal = await getAllRecipes();
            let recipeFiltered = await recipesTotal.filter(r =>
                r.diets.find((d) => (d.name === diet)))

            if (recipeFiltered.length) {
                res.status(200).send(recipeFiltered)
            } else {
                res.status(200).send(recipesTotal);
            }
        }
    } catch (e) {

        next(e)
    }
})





router.get('/', async (req, res) => {
    const { title } = req.query;
    try {
        let recipesTotal = await getAllRecipes();
        if (title) {
            let recipeTitle = await recipesTotal.filter(
                r => r.title.toLowerCase().includes(title.toLowerCase()));

            if (recipeTitle.length) {
                res.status(200).send(recipeTitle)
            } else {
                throw new Error('There are no recipes with that name')
            };
        } else {
            res.status(200).send(recipesTotal);
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});


router.post('/', async (req, res) => {
    let {
        title,
        summary,
        healthScore,
        image,
        instructions,
        createdInDb,
        diets
    } = req.body;

    try {
        let newRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            image,
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

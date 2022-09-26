const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const router = Router();
const mockJSON = require('../../mock/search.json');
const getAllRecipes = require('./utils/get-all-recipes.js')

//TODO realizar validaciones de back-end
//TODO ver por qué las dietas a veces se duplican
//TODO validar datos
//TODO hacer paginado para obtener recetas
//TODO hacer ruta delete y put

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let recipesTotal = await getAllRecipes();
    let recipeId = await recipesTotal.filter(r => r.id == id)?.[0]
    if (recipeId) {
        res.status(200).send(recipeId);
    } else {
        res.status(404).json('There is not recipes with this ID');
    }
});


router.get('/', async (req, res) => {
    const { title, diet, sortBy } = req.query;
    const { recipesT } = req.body;
    let recipesTotal = [];
    try {
        recipesTotal = await getAllRecipes();

        if (title) {
            let recipeTitle = await recipesTotal.filter(
                r => r.title.toLowerCase().includes(title.toLowerCase()));

            if (recipeTitle.length) {
                res.status(200).send(recipeTitle)
            } else {
                throw new Error('There are no recipes with that name')
            };
        } else {
            let recipeFiltered = recipesTotal;

            if (diet) {
                recipeFiltered = await recipeFiltered.filter(r =>
                    r.diets.find((d) => (d.name === diet)))
            }

            if (sortBy) {
                recipeFiltered = await recipeFiltered.sort(function (a, b) {
                    if (sortBy === 'titleAsc' || sortBy === 'titleDesc') {
                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            if (sortBy === 'titleAsc') return 1;
                            return -1;
                        }
                        if (b.title.toLowerCase() > a.title.toLowerCase()) {
                            if (sortBy === 'titleAsc') return -1;
                            return 1;
                        }
                        return 0;
                    }
                    if (sortBy === 'healthScoreAsc' || sortBy === 'healthScoreDesc') {
                        if (a.healthScore > b.healthScore) {
                            if (sortBy === 'healthScoreAsc') return 1;
                            return -1;
                        }
                        if (b.healthScore > a.healthScore) {
                            if (sortBy === 'healthScoreAsc') return -1;
                            return 1;
                        }
                        return 0;
                    }
                })
            }

            res.status(200).send(recipeFiltered);
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let recipesTotal = await getAllRecipes();
    let recipe = recipesTotal.find(r => r.id === parseInt(id));
    if (!id || !recipe) {
        return res
            .status(404)
            .json({
                error: 'There is not recipes with this ID'
            });
    }

    recipesTotal = recipesTotal.filter(p => p.id !== parseInt(id));
    res.send(recipesTotal);
})

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const {
//         title,
//         summary,
//         healthScore,
//         image,
//         instructions,
//         createdInDb,
//         diets
//     } = req.body;
// })
module.exports = router;

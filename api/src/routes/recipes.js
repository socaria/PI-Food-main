const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const router = Router();
const mockJSON = require('../../mock/search.json');
const getAllRecipes = require('./utils/get-all-recipes.js')

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
    let recipesFiltered = [];
    try {
        recipesFiltered = await getAllRecipes();

        if (title) {
            recipesFiltered = await recipesFiltered.filter(
                r => r.title.toLowerCase().includes(title.toLowerCase()));

            if (!recipesFiltered.length) {
                throw new Error('No recipes found')
            };
        }


        if (diet) {
            recipesFiltered = await recipesFiltered.filter(r =>
                r.diets.find((d) => (d.name === diet)))

        }

        if (sortBy) {
            recipesFiltered = await recipesFiltered.sort(function (a, b) {
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
        res.status(200).send(recipesFiltered);

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
        if (!title) { throw new Error('title should be defined') }
        if (!summary) { throw new Error('summary should be defined') }
        let newRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            image,
            instructions,
            createdInDb,
        })
        if (diets) {
            let dietDb = await Diet.findAll({
                where: { name: diets }
            })

            console.log("🚀 ~ file: recipes.js ~ line 109 ~ router.post ~ newRecipe", newRecipe)
            newRecipe.addDiets(dietDb);
        }
        res.send(newRecipe);

    } catch (e) {
        res.status(500).send(`${e}`)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    let recipeToDelete = await Recipe.findByPk(id)
    console.log("🚀 ~ file: recipes.js ~ line 122 ~ router.delete ~ recipeToDelete", recipeToDelete)

    if (!recipeToDelete) {
        return res
            .status(404)
            .json({
                error: 'There is not recipes with this ID'
            });
    }

    await Recipe.destroy({ where: { id: id } })
    res.send('done');
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        title,
        summary,
        healthScore,
        image,
        instructions,
        diets
    } = req.body;
    let recipesTotal = await getAllRecipes();
    let recipeId = await recipesTotal.filter(r => r.id == id)?.[0]
    try {
        if (!recipeId) { throw new Error('There is not recipes with this ID') }
        if (!title) { throw new Error('title should be defined') }
        if (!summary) { throw new Error('summary should be defined') }
        let edited = await Recipe.upsert(
            {
                id,
                title,
                summary,
                healthScore,
                image,
                instructions,
                diets
            }
        )
        if (diets) {
            let dietDb = await Diet.findAll({
                where: { name: diets }
            })

            edited[0].setDiets(dietDb);
        }

        res.send(edited);

    } catch (e) {
        res.status(500).send(`${e}`)
    }
})

module.exports = router;

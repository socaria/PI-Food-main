const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const router = Router();
const mockJSON = require('../../mock/search.json');
const getAllRecipes  = require('./api-bbdd.js')

router.get('/', async (req, res) => {
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

module.exports = router;

const { Router } = require('express');
const dietRoute = require ('./diet')
const recipeRoute = require('./recipe.js');
const recipesRoute = require('./recipes.js');

const router = Router();

router.use('/diet', dietRoute)
router.use('/recipe', recipeRoute)
router.use('/recipes', recipesRoute)

module.exports = router;

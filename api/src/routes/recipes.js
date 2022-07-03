const { Router } = require("express");
const { getAllData, getByIdApi, getByIdDB, deleteRecipe } = require("../controllers/recipes");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    let allRecipes = await getAllData();
    if (name) {
      let filtered = await allRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(name.toString().toLowerCase())
      );

      if (filtered.length) {
        let recipe = filtered.map((result) => {
          return {
            name: result.name,
            diets: result.diets ? result.diets : result.diets.map(d => d.name),
            image: result.image,
            id: result.id,
            healthScore: result.healthScore,
          };
        });
        
        return res.status(200).send(recipe);
      } else {
        return res.status(404).send("No tenemos esa receta :(");
      }
    } else {
      let recipes = allRecipes.map((result) => {
        return {
          id: result.id,
          name: result.name,
          image: result.image,
          diets: result.diets ? result.diets : result.diets.map(d => d.name),
          healthScore: result.healthScore,
        };
      });
      res.status(200).send(recipes);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length > 12){
      let dbRecipeId = await getByIdDB(id);
      return res.status(200).json(dbRecipeId);
    } else {
      let idApi = await getByIdApi(id);
      if (idApi.data.id) {
        let recipe = {
          vegetarian: idApi.data.vegetarian,
          vegan: idApi.data.vegan,
          glutenFree: idApi.data.glutenFree,
          dairyFree: idApi.data.dairyFree,
          name: idApi.data.title,
          image: idApi.data.image,
          score: idApi.data.spoonacularScore,
          healthScore: idApi.data.healthScore,
          types: idApi.data.dishTypes,
          diets: idApi.data.diets,
          summary: idApi.data.summary,
          steps: idApi.data.analyzedInstructions[0]
        };

        return res.status(200).send(recipe);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try{
    const { id } = req.params;
    if(id.length > 12){
      deleteRecipe(id);
      return res.status(200).send('Eliminado correctamente')
    }
  } catch(err){
    next(err)
  }
})

module.exports = router;

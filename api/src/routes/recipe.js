const { Router } = require("express");
const { Recipe, Diet } = require('../db')
const router = Router()

router.post("/", async (req, res, next) => {
   try {
      const {
         name,
         summary,
         score,
         healthScore,
         steps,
         diets
     } = req.body
     const newRecipe = await Recipe.create({ 
           name,
           summary,
           score,
           healthScore,
           steps,
       })

       let dietDB = await Diet.findAll({ 
         where: {name: diets}
     })
     newRecipe.addDiet(dietDB);
     res.status(201).send(newRecipe);

   }  catch (err) {
     next(err);
   }
 });

 module.exports = router;
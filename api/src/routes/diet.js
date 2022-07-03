const { Router } = require('express');
const { diets } = require('../controllers/diets')
const {Diet} = require('../db')
const router = Router();

/* GET DIETS */
router.get('/', async (req,res,next) =>{
   try{
      diets.forEach(d => {
         Diet.findOrCreate({
            where: {name: d}
         })
      });
      let dietsTypes = await Diet.findAll()
      res.send(dietsTypes)
   }
   catch (err){
      next(err)
   }
})

module.exports = router;
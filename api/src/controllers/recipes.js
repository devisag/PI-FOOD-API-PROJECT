const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { YOUR_API_KEY } = process.env;

const getApiData = async () => {
  const responseApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
  );

  const dataApi = await responseApi.data.results.map((result) => {
    return {
      name: result.title,
      vegetarian: result.vegetarian,
      vegan: result.vegan,
      glutenFree: result.glutenFree,
      dairyFree: result.dairyFree,
      image: result.image,
      id: result.id,
      score: result.spoonacularScore,
      healthScore: result.healthScore,
      types: result.dishTypes?.map((element) => element),
      diets: result.diets?.map((element) => element),
      summary: result.summary,
      steps: result.analyzedInstructions[0]?.steps.map((step) => {
        return {
          number: step.number,
          step: step.step,
        };
      }),
    };
  });
  return dataApi;
};

const getDataDB = async () => {
  try {
    let dataDb = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
      }
      },
    });
    return dataDb
  } catch (err) {
    return err;
  }
};

const getAllData = async () => {
  try {
    const apiData = await getApiData();
    const dbData = await getDataDB();
    let allData = [...apiData, ...dbData];

    return allData;
  } catch (err) {
    return err;
  }
};

const getByIdApi = async (id) => {
  let data = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${YOUR_API_KEY}`
  );
  return data;
};

const getByIdDB = async (id) => {
  let recipe = await Recipe.findByPk(id, {
    include: {
        model: Diet,
        attributes: ['name'],
        through: {
            attributes: [],
        }
    }
});
  return recipe
};

const deleteRecipe = async (id) => {
  await Recipe.destroy({
    where: {
      id: id
    }
  })
}

module.exports = {
  getAllData,
  getApiData,
  getDataDB,
  getByIdApi,
  getByIdDB,
  deleteRecipe
};

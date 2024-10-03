const axios = require("axios");

async function handleGetCategory(req, res) {
 try {
  const response = await axios.get(
   "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  res.json(response.data.categories);
 } catch (error) {
  console.error("Error fetching data:", error);
  res.status(500).json({ error: "An error occurred while fetching data" });
 }
}

async function handleGetAutoSuggestion(req, res) {
 try {
  const { value } = req.query;
  if (!value) return null;

  const response = await axios.get(
   `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );

  return res.json(response.data.meals);
 } catch (error) {
  console.log(`error ${error}`);
 }
}

async function handleGetMealPagination(req, res) {
 try {
  const { length, state, limit } = req.query;

  const response = await axios.get(
   "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );

  const tempMeal = [];
  const meals = response.data.meals;
  for (let i = length; i < length + limit; i++) {
   if (i < meals.length) tempMeal.push(meals[i]);
  }

  return res.json(tempMeal);
 } catch (error) {
  console.log("error : ", error);
 }
}

async function handleGetMealById(req, res){
    try{
        const {id} = req.params;
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        res.status(200).json(response.data);
    }catch(error){
        res.status(404).json(error);
    }
}

module.exports = {
 handleGetCategory,
 handleGetAutoSuggestion,
 handleGetMealPagination,
 handleGetMealById,
};

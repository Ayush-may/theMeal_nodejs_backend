const axios = require('axios');

async function handleGetCategoryMealById(req, res) {
	try{
		const { id } = req.params;
		const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
		
		res.status(200).json(response.data);
	}catch(error){
		res.status(400).json(error);
	}
}

module.exports = {
	handleGetCategoryMealById,
};
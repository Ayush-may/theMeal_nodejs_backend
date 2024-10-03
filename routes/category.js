const router = require("express").Router();

const {
	handleGetCategoryMealById
} = require(".././controller/category");

router.get('/:id',handleGetCategoryMealById);

module.exports = router;
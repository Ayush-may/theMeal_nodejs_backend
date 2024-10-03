const router = require("express").Router();
const {
    handleGetCategory,
    handleGetAutoSuggestion,
    handleGetMealPagination,
    handleGetMealById
} = require("../controller/meal");

router.get("/getMealById/:id", handleGetMealById);
router.get("/category", handleGetCategory);
router.get("/autosuggestion", handleGetAutoSuggestion);
router.get("/mealpagination", handleGetMealPagination);

module.exports = router;

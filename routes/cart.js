const { handleCartToOrder } = require("../controller/cartController");

const router = require("express").Router();

router.post("/cartToOrder", handleCartToOrder);

module.exports = router;
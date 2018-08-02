const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");
const productController = require("../controllers/products");

router.get("/", productController.get_all);

router.post("/", checkAuth, productController.post);

router.get("/:productId", productController.getId);

router.patch("/:productId", checkAuth, productController.patch);

router.delete('/:productId', checkAuth, productController.delete);

module.exports = router;

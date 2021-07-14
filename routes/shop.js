const path = require("path");

const express = require("express");
const router = express.Router();

const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductDetails,
  postCart,
} = require("../controllers/shop");

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProductDetails);

router.post("/cart", postCart);

router.get("/cart", getCart);

router.get("/checkout", getCheckout);

router.get("/orders", getOrders);

module.exports = router;

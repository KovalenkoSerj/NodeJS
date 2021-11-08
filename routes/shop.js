const path = require("path");

const express = require("express");
const router = express.Router();
const isAuth = require('../middleware/is-auth')
const {
  getProducts,
  getIndex,
  getCart,
  // // getCheckout,
  getOrders,
  getProductDetails,
  postCart,
  postCartDeleteProduct,
  postOrder
} = require("../controllers/shop");

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProductDetails);

router.post("/cart", isAuth,  postCart);

router.get("/cart", isAuth, getCart);

router.post("/create-order", isAuth, postOrder);

// // router.get("/checkout", getCheckout);

router.get("/orders", isAuth, getOrders);

router.post("/cart-delete-item", isAuth, postCartDeleteProduct);

module.exports = router;

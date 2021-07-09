const express = require('express');
const router = express.Router();
const { addProduct, getAddProduct } = require('../controllers/product')

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', addProduct);

module.exports = router;

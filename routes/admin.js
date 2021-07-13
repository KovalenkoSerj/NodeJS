const express = require('express');
const router = express.Router();
const { getAddProduct, addProduct, getProducts} = require('../controllers/admin')

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

router.get('/products', getProducts);
// /admin/add-product => POST

router.post('/add-product', addProduct);


module.exports = router;

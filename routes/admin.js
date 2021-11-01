const express = require('express');
const router = express.Router();
const {
    getAddProduct,
    addProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    deleteProduct
} = require('../controllers/admin')

// // /admin/add-product => GET
router.get('/add-product', getAddProduct);

router.get('/products', getProducts);
// /admin/add-product => POST

router.post('/add-product', addProduct);

router.get('/edit-product/:productId', getEditProduct);

router.get('/edit-product', getEditProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', deleteProduct);

module.exports = router;
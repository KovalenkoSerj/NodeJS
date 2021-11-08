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
const isAuth = require('../middleware/is-auth');



// // /admin/add-product => GET
router.get('/add-product', isAuth, getAddProduct);

router.get('/products', isAuth, getProducts);
// /admin/add-product => POST

router.post('/add-product', isAuth, addProduct);

router.get('/edit-product/:productId', isAuth,getEditProduct);

router.get('/edit-product', isAuth,  getEditProduct);

router.post('/edit-product', isAuth, postEditProduct);

router.post('/delete-product', isAuth, deleteProduct);

module.exports = router;
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
const {
    body
} = require('express-validator');


// // /admin/add-product => GET
router.get('/add-product', isAuth, getAddProduct);

router.get('/products', isAuth, getProducts);
// /admin/add-product => POST

router.post('/add-product', [
    body('title', 'Title Length should be more than 2 characters').isString().isLength({
        min: 3
    }).trim(),
    body('price').isFloat(),
    body('description').isLength({
        min: 5
    })

], isAuth, addProduct);

router.get('/edit-product/:productId', isAuth, getEditProduct);

router.get('/edit-product', isAuth, getEditProduct);

router.post('/edit-product', [
    body('title', ).isString().isLength({
        min: 3
    }).trim(),

    body('price').isFloat(),
    body('description').isLength({
        min: 5
    })

], isAuth, postEditProduct);

router.delete('/product/:productId', isAuth, deleteProduct);

module.exports = router;
const path = require('path');

const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/product')
router.get('/', getProducts);

module.exports = router;

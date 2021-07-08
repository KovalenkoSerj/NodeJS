const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const poducts = adminData.products;
  res.render('shop', {prods: poducts, docTitle: 'Shop'});
});

module.exports = router;

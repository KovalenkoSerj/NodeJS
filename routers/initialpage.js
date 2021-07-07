const express = require('express')

const path = require('path');

const rootDir = require('../util/rootDir')

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'initialpage.html'));
})


module.exports = router;
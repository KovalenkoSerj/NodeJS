const express = require('express');
const router = express.Router();


const {
    login,
    signin
} = require('../controllers/login')

router.get('/login', login)

router.post('/login', signin)


module.exports = router
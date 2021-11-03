const express = require('express');
const router = express.Router();


const {
    login,
    signin,
    signout
} = require('../controllers/login')

router.get('/login', login)

router.post('/login', signin)

router.post('/logout', signout)

module.exports = router
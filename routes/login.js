const express = require('express');
const router = express.Router();


const {
    login,
    signin,
    signout,
    signup,
    signupPage,
    getResetPassword,
    postReset,
    getUpdatePassword,
    postUpdatePassword
} = require('../controllers/login')

router.get('/login', login)

router.post('/login', signin)

router.post('/logout', signout)

router.post('/signup', signup)

router.get('/signup', signupPage)

router.get('/reset', getResetPassword)

router.post('/reset', postReset)

router.get('/reset/:token', getUpdatePassword)

router.post('/new-password', postUpdatePassword)

module.exports = router
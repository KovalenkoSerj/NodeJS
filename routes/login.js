const express = require('express');
const router = express.Router();
const {
    check,
    body
} = require('express-validator');

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
const User = require('../models/user')
router.get('/login', login)

router.post('/login', [
    body('email', 'Please enter a valid email address').isEmail().normalizeEmail(),
    body('password', 'Invalid password').isLength({
        min: 5
    }).isAlphanumeric().trim(),
], signin)

router.post('/logout', signout)

router.post('/signup', [
    check('email', 'Invalid email').isEmail().custom(async (value, {
        req
    }) => {
        const userCheck = await User.findOne({
            email: value
        });
        if (userCheck) {
            return Promise.reject('Email already exist')
        }
    }).normalizeEmail().trim(),
    // check('password', 'Minimum password length should be 6 symbols').isLength({min: 6})
    body('password', 'Please enter a password with number and text and length shoud be at least 5 charachters').isLength({
        min: 5
    }).isAlphanumeric().trim(),
    body('password_confirm').custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            throw new Error('Password doesn\'t match')
        }
        return true
    }).trim()
], signup)

router.get('/signup', signupPage)

router.get('/reset', getResetPassword)

router.post('/reset', postReset)

router.get('/reset/:token', getUpdatePassword)

router.post('/new-password', postUpdatePassword)

module.exports = router
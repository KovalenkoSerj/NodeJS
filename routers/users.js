const express = require('express');

const router = express.Router();
const users = [];
router.get('/add-user', (req,res) => {
    res.render('add-user', {docTitle: 'User Page', path: '/admin/add-user'})
})

router.post('/add-user', (req,res) => {
    users.push({username: req.body.username, lastname: req.body.lastname, email: req.body.email})
    // res.render('initpage', { users: users})
    res.redirect('/');
    
})
exports.routes = router;
exports.usersList = users;

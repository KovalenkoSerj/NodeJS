const express = require('express');
const router = express.Router();
const adminRoutes = require('./users');

router.get('/', (req,res) => {
    const usersList = adminRoutes.usersList;
    console.log(usersList)

    // res.sendFile(path.join(rootDir, 'views', 'initpage.html'))
    res.render('initpage', {users: usersList, docTitle: 'Greetengs', path: '/'})
})


module.exports = router;
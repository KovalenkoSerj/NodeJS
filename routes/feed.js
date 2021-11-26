const express = require('express');

const router = express.Router();
const {
    getPOsts,
    postPosts
} = require('../controllers/feed');

// GET /feed/posts
router.get('/posts', getPOsts);

// POST 
router.post('/post', postPosts);


module.exports = router;

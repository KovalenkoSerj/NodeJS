exports.getPOsts = (req, res, next) => {
    res.json({
        posts: [{
            title: 'First Post',
            content: 'This is for the first post'
        }]
    })
}


exports.postPosts = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    console.log(req.body)
    res.status(201).json({
        message: 'Post created successfully',
        post: {id: new Date().toISOString(), title: title, content: content}
    })
}




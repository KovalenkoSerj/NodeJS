const express = require('express');
const app = express();
const feedRoute = require('./routes/feed')

// app.use(express.urlencoded({extended: true})) // x-www-form-urlencoded // form 
app.use(express.json()) // app/json


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoute);

app.listen(8080);
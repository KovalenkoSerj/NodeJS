const routes = require('./routes')
const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('In the product middleware');
    res.send('<h1>Hello from express</h1>')
})


app.use('/product', (req, res, next) => {
    console.log('In the next middleware');
    res.send('<h1>Hello from product</h1>')
})





app.listen(3000)
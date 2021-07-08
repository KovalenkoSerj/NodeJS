const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const initialPage = require('./routers/initialpage');
const usersPage = require('./routers/users')
const rootDir = require('./util/rootDir')
const path = require('path')
const port = 3000;


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', usersPage);
app.use('/', initialPage)



app.listen(port)
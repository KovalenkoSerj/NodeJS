const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

const bodyParser = require('body-parser');

const userRoutes = require('./routers/initpage');
const adminRoutes = require('./routers/users');


app.set('view engine', 'pug');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: false}))

app.use('/admin', adminRoutes.routes)
app.use(userRoutes)

app.listen(PORT)
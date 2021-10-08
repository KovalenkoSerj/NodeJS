const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorPageController = require('./controllers/404')

const app = express();
// const db = require('./util/database');

const sequelize = require('./util/database')


app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorPageController.errorPage);


sequelize.sync().then(result => {
    // console.log(result)
    app.listen(3000);

})
    .catch(err => {
        console.log(err);
    })


const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorPageController = require("./controllers/404");

const app = express();
// const db = require('./util/database');

const sequelize = require("./util/database");
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next) => {
  User.findByPk(2).then(user => {
    req.user = user;
    next();
  }).catch(err => console.log(err))
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);


app.use(errorPageController.errorPage);
Product.belongsTo(User, {constrains: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
sequelize
  .sync()
  // .sync({force: true})
  .then((result) => {
    // console.log(result)
    return User.findByPk(2)
  })
  .then(user => {
    if(!user){
      return User.create({name: 'serhii', email: 'test@test.com'})
    }
    return user
  })
  .then(user => {
    console.log(user);
    return user.createCart()
  })
  .then(cart => {
    app.listen(3000);

  })
  .catch((err) => {
    console.log(err);
  });

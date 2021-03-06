const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorPageController = require("./controllers/404");
const mongoConnect = require('./util/database');
const app = express();


app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const loginRoutes = require("./routes/login");
const User = require("./models/user");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.use( async (req, res, next) => {
  const user = await User.findByEmail('qwer@qwer.com');
  req.user = new User(user.name, user.email, user.cart, user._id )
  next()
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(loginRoutes);


// mongoConnect()

const start = async () =>  {
  try {
    await mongoConnect();
    console.log('Database connected successfully!')
    app.listen(3000)
  } catch (error) {
    console.log('Server error', error.message)
    process.exit(1)
  }
}

start()







// Sequelize logic

// const db = require('./util/database');

// const sequelize = require("./util/database");
// const Product = require('./models/product')
// const User = require('./models/user')
// const Cart = require('./models/cart')
// const CartItem = require('./models/cart-item')
// const Order = require('./models/order')
// const OrderItem = require('./models/order-item')


// app.use(errorPageController.errorPage);
// Product.belongsTo(User, {constrains: true, onDelete: 'CASCADE'})
// User.hasMany(Product)
// User.hasOne(Cart)
// Cart.belongsTo(User)
// Cart.belongsToMany(Product, {through: CartItem})
// Product.belongsToMany(Cart, {through: CartItem})
// Order.belongsTo(User)
// User.hasMany(Order)
// Order.belongsToMany(Product, {through: OrderItem})


// sequelize
//   .sync()
//   // .sync({force: true})
//   .then((result) => {
//     // console.log(result)
//     return User.findByPk(2)
//   })
//   .then(user => {
//     if(!user){
//       return User.create({name: 'serhii', email: 'test@test.com'})
//     }
//     return user
//   })
//   .then(user => {
//     console.log(user);
//     return user.createCart()
//   })
//   .then(cart => {
//     app.listen(3000);

//   })
//   .catch((err) => {
//     console.log(err);
//   });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorPageController = require("./controllers/404");
// const mongoConnect = require("./util/database");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://serhii:rootroot@cluster0.n6xnp.mongodb.net/shop?retryWrites=true&w=majority';
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});


app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const loginRoutes = require("./routes/login");
const User = require("./models/user");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}))

// app.use(async (req, res, next) => {
//   const user = await User.find({
//     email: 'qwer@qwer.com'
//   });
//   req.user = user;
//   next()
// })
app.use(async (req,res,next) => {
  if(!req.session.user){
    return next()
  }
  try {
    const user = await User.findById(req.session.user[0]._id);
    req.user = user;
    next()
  } catch (error) {
    console.log('Error during login user ' , error.message)
  }
 
})
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(loginRoutes);


async function connect() {
  try {
    const db = await mongoose.connect(
      MONGODB_URI
    );
    const findUser = await User.findOne();
    if (!findUser) {
      const user = new User({
        name: 'Serhii',
        email: 'qwer@qwer.com',
        cart: {
          items: []
        }
      })
      user.save()
    }

    app.listen(3000);
  } catch (error) {
    console.log("Server Error", error.message);
  }
}

connect();


app.use(errorPageController.errorPage)
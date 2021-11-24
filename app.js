const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorPageController = require("./controllers/404");
// const mongoConnect = require("./util/database");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer')


const MONGODB_URI = 'mongodb+srv://serhii:rootroot@cluster0.n6xnp.mongodb.net/shop?retryWrites=true&w=majority';



const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});



const csrfProtect = csrf()
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() + '-' + file.originalname)
  }
})

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
app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'))



app.use(express.static(path.join(__dirname, "public")));
app.use('/images' , express.static(path.join(__dirname, "images")));


app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}))


app.use(csrfProtect)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next()
  }
  try {
    const user = await User.findById(req.session.user._id);
    req.user = user;
    next()
  } catch (error) {
    console.log('Error during finding user ', error.message)
  }

})



app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(loginRoutes);

// app.use(errorPageController.get505)
// app.use(errorPageController.errorPage)

// app.use((error, req, res, next) => {
//   res.redirect('/500')
//   res.status(error.httpStatus)
// })

async function connect() {
  try {
    const db = await mongoose.connect(
      MONGODB_URI
    );
    app.listen(3000);
  } catch (error) {
    console.log("Server Error", error.message);
  }
}

connect();
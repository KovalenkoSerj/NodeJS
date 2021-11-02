const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorPageController = require("./controllers/404");
// const mongoConnect = require("./util/database");
const mongoose = require("mongoose");
const app = express();

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

app.use( async (req, res, next) => {
  const user = await User.find({email: 'qwer@qwer.com'});
  req.user = user;
  next()
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(loginRoutes);


async function connect() {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://serhii:rootroot@cluster0.n6xnp.mongodb.net/shop?retryWrites=true&w=majority"
    );
    const findUser = await User.findOne();
    if(!findUser){
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


app.use(function(req,res){
  res.status(404).render('404');
});
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

// app.use( async (req, res, next) => {
//   const user = await User.findByEmail('qwer@qwer.com');
//   req.user = new User(user.name, user.email, user.cart, user._id )
//   next()
// })

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(loginRoutes);

// mongoConnect()

// const start = async () =>  {
//   try {
//     await mongoConnect();
//     console.log('Database connected successfully!')
//     app.listen(3000)
//   } catch (error) {
//     console.log('Server error', error.message)
//     process.exit(1)
//   }
// }

// start()

async function connect() {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://serhii:rootroot@cluster0.n6xnp.mongodb.net/shop?retryWrites=true&w=majority"
    );
    app.listen(3000);
  } catch (error) {
    console.log("Server Error", error.message);
  }
}

connect();

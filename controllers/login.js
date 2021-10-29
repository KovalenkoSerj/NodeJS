const User = require('../models/user')

exports.login = (req, res, next) => {
  res.render("login/login", {
    docTitle: "Login",
    btnTitle: "Submit",
    path: '/login'

  });
};


exports.signin = async (req, res, next) => {
  const user = new User(req.body.username, req.body.email);
  const object = await user.save();
  res.redirect('/')

}
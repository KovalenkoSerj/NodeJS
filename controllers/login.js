const User = require('../models/user')

exports.login = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split('=')[1]
  // console.log(isLoggedIn)
  res.render("auth/login", {
    docTitle: "Login",
    btnTitle: "Submit",
    path: '/login',
    isAuthenticated: false


  });
};


exports.signin = async (req, res, next) => {
  try {
    const user = await User.find({
      email: 'qwer@qwer.com'
    });
    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.save((err) => {
      console.log(err);
      res.redirect('/')

    })
  } catch (error) {
    console.log('Error during login process', error.message);
  }
  // res.setHeader('Set-Cookie', 'loggedIn=true')
  // const user = new User(req.body.username, req.body.email);
  // const object = await user.save();


}

exports.signout = async (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error)
    res.redirect('/')
  });
  // res.setHeader('Set-Cookie', 'loggedIn=true')
  // const user = new User(req.body.username, req.body.email);
  // const object = await user.save();


}
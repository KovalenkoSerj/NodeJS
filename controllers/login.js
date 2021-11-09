const User = require('../models/user')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const {
  validationResult
} = require('express-validator')
const transport = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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',
  },
}));

exports.login = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split('=')[1]
  // console.log(isLoggedIn)
  res.render("auth/login", {
    docTitle: "Login",
    btnTitle: "Submit",
    path: '/login',
    errorMsg: req.flash('error'),
    oldInput: {
      email: '',
      password: '',
    },
    validationErrors: []


  });
};


exports.signin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/login", {
        docTitle: "Login",
        btnTitle: "Submit",
        path: '/login',
        errorMsg: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password,
        },
        validationErrors: errors.array()
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      // req.flash('error', 'Ivalid email/password.')
      // return res.redirect('/login');
      return res.status(422).render("auth/login", {
        docTitle: "Login",
        btnTitle: "Submit",
        path: '/login',
        errorMsg: 'Invalid Email/Password',
        oldInput: {
          email: email,
          password: password,
        },
        validationErrors: []
      });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      // req.flash('error', 'Ivalid email/password.')
      // return res.redirect('/login')
      return res.status(422).render("auth/login", {
        docTitle: "Login",
        btnTitle: "Submit",
        path: '/login',
        errorMsg: 'Invalid Email/Password',
        oldInput: {
          email: email,
          password: password,
        },
        validationErrors: []
      });
    }

    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.save((err) => {
      console.log(err);
      res.redirect('/')


    })
  } catch (error) {
    console.log('Error during login process', error.message);
    res.redirect('/login')
  }
  // res.setHeader('Set-Cookie', 'loggedIn=true')
  // const user = new User(req.body.username, req.body.email);
  // const object = await user.save();


}

exports.signout = async (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error)
    res.redirect('/');
  });
  // res.setHeader('Set-Cookie', 'loggedIn=true')
  // const user = new User(req.body.username, req.body.email);
  // const object = await user.save();


}


exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const password_confirm = req.body.password_confirm;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).render("auth/signup", {
        docTitle: "Login",
        btnTitle: "Submit",
        path: '/signup',
        errorMsg: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password,
          password_confirm: req.body.password_confirm
        },
        validationErrors: errors.array()

      });
    }

    const bcrptPass = await bcrypt.hash(password, 12);

    const user = await new User({
      email,
      password: bcrptPass,
      cart: {
        items: []
      }
    })

    const createdUser = await user.save();
    res.redirect('/login')
    transport.sendMail({
      to: email,
      from: 'kovalenko.serhii92@gmail.com',
      subject: 'Signup Success',
      html: '<h1>You successfully signed up<h1>',
    })
    console.log('User Created ', createdUser)

  } catch (error) {
    console.log('Error during signIn process ', error.message)
  }
}


exports.signupPage = async (req, res, next) => {
  res.render("auth/signup", {
    docTitle: "Login",
    btnTitle: "Submit",
    path: '/signup',
    errorMsg: req.flash('error'),
    oldInput: {
      email: '',
      password: '',
      password_confirm: ''
    }

  })
}

exports.getResetPassword = (req, res, next) => {
  res.render("auth/reset", {
    docTitle: "Reset Password",
    btnTitle: "Reset Password",
    path: '/reset-password',
    errorMsg: req.flash('error')

  })
}

exports.postReset = (req, res, next) => {

  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err)
      return res.redirect('/reset')
    }
    const token = buffer.toString('hex');
    try {
      const user = await User.findOne({
        email: req.body.email
      });
      if (!user) {
        req.flash('error', 'No account with that email');
        res.redirect('/reset');
      }

      user.resetToken = token;
      user.resetTokenExpire = Date.now() + 3600000;
      const saveUser = await user.save();
      res.redirect('/')
      transport.sendMail({
        to: req.body.email,
        from: 'kovalenko.serhii92@gmail.com',
        subject: 'Password Reset',
        html: `<p>You requested password reset</>
              <p>Click this <a href='http://localhost:3000/reset/${token}'>link</a></p>`,
      })


    } catch (error) {
      console.log('Error during finding user ', error.message)
    }
  });


}


exports.getUpdatePassword = async (req, res, next) => {

  try {
    const token = req.params.token;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: {
        $gt: Date.now()
      }
    });
    res.render("auth/new-password", {
      docTitle: "Update Password",
      btnTitle: "Update Password",
      path: '/new-password',
      errorMsg: req.flash('error'),
      userId: user._id.toString(),
      passwordToken: token,

    })
  } catch (error) {
    console.log('Impossible to get user token', error.message)
  }
}


exports.postUpdatePassword = async (req, res, next) => {
  try {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpire: {
        $gt: Date.now()
      },
      _id: userId
    })
    const hashedPass = await bcrypt.hash(newPassword, 12);
    console.log(hashedPass)
    user.password = hashedPass;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    user.save();
    res.redirect('/login')


    console.log('User updated')

  } catch (error) {
    console.log(' Something went wrong during update user password', error.message);
  }

}
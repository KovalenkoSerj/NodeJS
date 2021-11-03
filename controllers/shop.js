const Product = require("../models/product");
const Order = require('../models/order');


exports.getProducts = async (req, res, next) => {

  try {
    const products = await Product.find() // .select().populate('userId', 'name');
    console.log(products)
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products list",
      path: "/products ",
      isAuthenticated: req.session.isLoggedIn

    });
  } catch (error) {
    console.log("Fetching error", error, message);
  }
};

exports.getProductDetails = async (req, res, next) => {
  const prodId = req.params.productId;
  let product;

  try {
    product = await Product.findById(prodId);
    console.log(product);
    res.render("shop/product-details", {
      prods: product,
      docTitle: product.title,
      path: "/products",
      isAuthenticated: req.session.isLoggedIn

    });
  } catch (error) {
    console.log("Error", error.message);
  }
};

exports.getIndex = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      isAuthenticated: req.session.isLoggedIn

    });
  } catch (error) {
    console.log("Error ", error.message);
  }
};

exports.getCart = async (req, res) => {
  const user = await req.user.populate('cart.items.productId')
  const prods = user.cart.items;

  res.render("shop/cart", {
    path: "/cart",
    docTitle: "Your Cart",
    products: prods,
    isAuthenticated: req.session.isLoggedIn

  });
  //   });
  // });
};

exports.postCart = async (req, res) => {
  console.log(req.user)
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  await req.user.addToCart(product);
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user.removeFromCart(prodId);
  res.redirect("/cart");
};

exports.postOrder = async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.productId');
    console.log('USER', user)
    const products = user.cart.items.map(i => {
      return {
        quantity: i.quantity,
        product: {
          ...i.productId._doc
        }
      }
    })
    const order = new Order({
      user: {
        name: user.name,
        userId: user
      },
      products: products
    })
    order.save();
    req.user.clearCart();
    res.redirect("/orders");
  } catch (error) {
    console.log('Error with post order method', error.message)
  }
};

exports.getOrders = async (req, res) => {
  const order = await Order.find({
    'user.userId': req.user._id
  });

  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders: order,
    isAuthenticated: req.session.isLoggedIn

  })
};
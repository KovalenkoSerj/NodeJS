const Product = require("../models/product");
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const product = require("../models/product");

const ITEMS_PER_PAGE = 1;


exports.getProducts = async (req, res, next) => {

  try {
    // const products = await Product.find() // .select().populate('userId', 'name');
    const page = req.query.page || 1;
    const parsedPage = parseInt(page)
    const totalItems = await Product.find().countDocuments();
    const products = await Product.find().skip((parsedPage - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products list",
      path: "/products ",
      currentPage: parsedPage,
      hasNextPage: ITEMS_PER_PAGE * parsedPage < totalItems,
      hasPrevPage: parsedPage > 1,
      nextPage: parsedPage + 1,
      previousPage: parsedPage - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)

    });
  } catch (error) {
    console.log("Fetching error", error, message);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const parsedPage = parseInt(page)
    const totalItems = await Product.find().countDocuments();
    const products = await Product.find().skip((parsedPage - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    console.log('PRODS', products)
    // return 
    // const products =
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      currentPage: parsedPage,
      hasNextPage: ITEMS_PER_PAGE * parsedPage < totalItems,
      hasPrevPage: parsedPage > 1,
      nextPage: parsedPage + 1,
      previousPage: parsedPage - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)


    });
  } catch (error) {
    console.log("Error ", error.message);
  }
};


exports.getProductDetails = async (req, res, next) => {
  const prodId = req.params.productId;
  let product;

  try {
    product = await Product.findById(prodId);

    res.render("shop/product-details", {
      prods: product,
      docTitle: product.title,
      path: "/products",

    });
  } catch (error) {
    console.log("Error", error.message);
  }
};


exports.getCart = async (req, res) => {
  const user = await req.user.populate('cart.items.productId')
  const prods = user.cart.items;

  res.render("shop/cart", {
    path: "/cart",
    docTitle: "Your Cart",
    products: prods,

  });
  //   });
  // });
};

exports.postCart = async (req, res, next) => {

  const prodId = req.body.productId
  const product = await Product.findById(prodId);
  req.user.addToCart(product);
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
        email: user.email,
        userId: user
      },
      products: products
    })
    order.save();
    req.user.clearCart();
    res.redirect("/orders");
  } catch (error) {
    console.log('Error with post order method', error.message)
    const err = new Error(error.message);
    err.httpStatus = 500;
    return next(err)
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

  })
};


exports.getInvoice = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const checkOrder = await Order.findById(orderId);
    if (!checkOrder) {
      return next(new Error('No order found'));
    }
    if (checkOrder.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error('Unauthorized'))
    }
    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName)
    const pdfDoc = new PDFDocument();
    res.contentType("application/pdf");
    res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(26).text('Invoice', {
      underline: true,

    })
    pdfDoc.text('----------------------------------------------------')
    let totalPrice = 0;
    checkOrder.products.forEach(prod => {
      totalPrice += prod.quantity * prod.product.price
      pdfDoc.fontSize(14).text('Title: ' + prod.product.title + ' Quantity - ' + prod.quantity + ' - $' + prod.product.price)
    })
    pdfDoc.text('----------------------------------------------------')
    pdfDoc.text('Total Price: ' + totalPrice)
    pdfDoc.end();
    // fs.readFile(invoicePath, (err, data) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.contentType("application/pdf");
    //   res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
    //   res.send(data);
    // })
    // const file = fs.createReadStream(invoicePath);
    // res.contentType("application/pdf");
    // res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
    // file.pipe(res)

  } catch (error) {
    console.log("Read file operation failed ", error.message);
    const err = new Error(error.message);
    err.httpStatus = 500;
    return next(err)
  }


}
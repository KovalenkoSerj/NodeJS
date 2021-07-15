const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  const product = Product.findById(prodId, product => {
    res.render('shop/product-details', {
      prods: product,
      doctTitle: product.title,
      path: '/products'
    })
  });

};

exports.getIndex = (req, res) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Product List",
      path: "/",
    });
  });
};

exports.getCart = (req, res) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProd = []
      for(product of products) {
        const cartProdData = cart.products.find(prod => prod.id === product.id)
        if(cart.products.find(prod => prod.id === product.id)){
          cartProd.push({productData: product, qty: cartProdData.qty});
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProd
      });
    })
   
  })

};


exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    console.log(product)
    Cart.addProduct(prodId, product.price)
  })
  res.redirect("/cart");
};


exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(product.id, product.price)
    res.redirect('/cart')
  })

};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};
const Product = require("../models/product");
// const Cart = require("../models/cart");
// const Order = require("../models/order");
exports.getProducts = async (req, res, next) => {
  // const products = Product.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     prods: products,
  //     docTitle: "All Products",
  //     path: "/products",
  //   });
  // });
  try {
    const products = await Product.fetchAll();
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products list",
      path: "/products "
    });
  } catch (error) {
    console.log("Fetching error", error, message);
  }
  // Product.findAll()
  //   .then((products) => {
  //     res.render("shop/product-list", {
  //       prods: products,
  //       docTitle: "All Products list",
  //       path: "/products "
  //     });
  //   })
  //   .catch((err) => console.log(err));
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       docTitle: "All Products",
  //       path: "/products"
  //     });
  //   })
  //   .catch((err) => console.log(err));
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
      path: "/products"
    });
  } catch (error) {
    console.log("Error", error.message);
  }
  // Product.findAll({where: {
  //   id: prodId
  // }}).then(products => {
  //   res.render("shop/product-details", {
  //         prods: products[0],
  //         doctTitle: products[0].title,
  //         path: "/products"
  //       });
  // })
  // .then((product) => {
  // .then(([product]) => {

  //   res.render("shop/product-details", {
  //     prods: product,
  //     doctTitle: product.title,
  //     path: "/products"
  //   });
  // })
  // .catch((err) => console.log(err));
};

exports.getIndex = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/"
    });
  } catch (error) {
    console.log("Error ", error.message);
  }

  // .then((products) => {

  // })
  // .catch((err) => console.log(err));
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       docTitle: "Product List",
  //       path: "/"
  //     });
  //   })
  //   .catch(err => console.log(err))
};

exports.getCart = async (req, res) => {
  const prods = await req.user.getCart();
  console.log(prods);
  // .then((cart) =>
  //   cart
  //     .getProducts()
  //     .then((products) => {
  //       res.render("shop/cart", {
  //         path: "/cart",
  //         pageTitle: "Your Cart",
  //         products: products
  //       });
  //     })
  //     .catch((err) => console.log(err))
  // )
  // .catch((err) => console.log(err));
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProd = [];
  //     for (product of products) {
  //       const cartProdData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cart.products.find((prod) => prod.id === product.id)) {
  //         cartProd.push({ productData: product, qty: cartProdData.qty });
  //       }
  //     }
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: prods
  });
  //   });
  // });
};

exports.postCart = async (req, res) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  req.user.addToCart(product);
  res.redirect("/cart");

  // let fetchedCart;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     let newQuantity = 1;
  //     if (product) {
  //       const prevQuantity = product.cartItem.quantity;
  //       newQuantity = prevQuantity + 1;
  //       return fetchedCart.addProduct(product, {
  //         through: { quantity: newQuantity }
  //       });
  //     }
  //     return Product.findByPk(prodId)
  //       .then((product) => {
  //         return fetchedCart.addProduct(product, {
  //           through: { quantity: newQuantity }
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   })
  //   .then((cart) => res.redirect("/cart"))
  //   .catch((err) => console.log(err));
  //  const prodId = req.body.productId;
  //  Product.findByPk(prodId, (product) => {
  //    console.log(product);
  //    Cart.addProduct(prodId, product.price);
  //  });
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId);
  // .then((cart) => {
  //   return cart.getProducts({ where: { id: prodId } });
  // })
  // .then((products) => {
  //   const product = products[0];
  //   product.cartItem.destroy();
  // })
  // .then((result) => {
  res.redirect("/cart");
  // })
  // .catch((err) => console.log(err));
  // const prodId = req.body.productId;
  // Product.findByPk(prodId, (product) => {
  //   Cart.deleteProduct(product.id, product.price);
  //   res.redirect("/cart");
  // });
};

// exports.getCheckout = (req, res) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout"
//   });
// };

exports.postOrder = (req, res) => {
  try {
    req.user.addOrder();
    res.redirect("/orders");
  } catch (error) {
    console.log('Error with post order method' , error.message)
  }
 
  // .getCart()
  // .then((cart) => {
  //   fetchedCart = cart;
  //   return cart.getProducts();
  // })
  // .then((products) => {
  //   return req.user
  //     .createOrder()
  //     .then((order) => {
  //       return order.addProducts(
  //         products.map((product) => {
  //           product.orderItem = { quantity: product.cartItem.quantity };
  //           return product;
  //         })
  //       );
  //     })
  //     .catch((err) => console.log(err));
  // })
  // .then((result) => {
  //   fetchedCart.setProducts(null);
  // })
  // .then((result) => {
  //   res.redirect("/orders");
  // })
  // .catch((err) => console.log(err));
};

exports.getOrders = async (req, res) => {
  const order = await req.user.getOrders()
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: order
    })
};

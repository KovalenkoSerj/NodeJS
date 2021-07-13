const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render("admin/add-product", {
      docTitle: "Library",
      btnTitle: "Submit",
      labelTitle: "Title",
      path: "/admin/add-product",
    });
  };


  exports.addProduct = (req, res, next) => {
    const product = new Product(
      req.body.title,
      req.body.imageUrl,
      req.body.price,
      req.body.description,
    );
    product.save();
    res.redirect("/");
  };

  exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render("admin/products", {
          prods: products,
          docTitle: "Admin Products",
          path: "/admin/products",
        });
      });
  }
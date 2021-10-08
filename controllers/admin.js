const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Library",
    btnTitle: "Submit",
    labelTitle: "Title",
    path: "/admin/edit-product",
    editing: false
  });
};

exports.addProduct = (req, res, next) => {
  // const product = new Product(
  //   null,
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // );
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
  Product.create({
    title,
    imageUrl,
    price,
    description
  })
    .then((result) => {
      console.log("Product Created")
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err));
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        btnTitle: "Update Product",
        labelTitle: "Title",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     docTitle: "Edit Product",
  //     btnTitle: "Update Product",
  //     labelTitle: "Title",
  //     path: "/admin/edit-product",
  //     editing: editMode,
  //     product: product
  //   });
  // });
};

exports.postEditProduct = (req, res, next) => {
  // const updatedProd = new Product(
  //   req.body.productId,
  //   req.body.title,
  //   req.body.imageUrl,
  //   req.body.price,
  //   req.body.description
  // );
  Product.findByPk(req.body.productId)
    .then((product) => {
      product.title = req.body.title;
      product.imageUrl = req.body.imageUrl;
      product.price = req.body.price;
      product.description = req.body.description;
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
      console.log("Updated Product ");
    })
    .catch((err) => console.log(err));
  // updatedProd.save();
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch((err) => console.log(err));
  // const products = Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     docTitle: "Admin Products",
  //     path: "/admin/products"
  //   });
  // });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId);
  Product.findByPk(prodId)
    .then((product) => product.destroy())
    .then(result => {
      console.log('Product Destroyed ' , product.title);
      res.redirect("/admin/products");

    })
    .catch((err) => console.log(err));
};

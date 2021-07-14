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
  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description,
  );
  product.save();
  res.redirect("/");
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/')
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

};

exports.postEditProduct = (req, res, next) => {
  const updatedProd = new Product(req.body.productId, 
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description);
    updatedProd.save();
    res.redirect('/admin/products')
    
}

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}
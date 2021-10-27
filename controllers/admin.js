const Product = require("../models/product");
const util = require('util')
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
// Lesson 14 Continue


exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Library",
    btnTitle: "Submit",
    labelTitle: "Title",
    path: "/admin/edit-product",
    editing: false
  });
};

exports.addProduct = async (req, res, next) => {
  // const product = new Product(
  //   null,
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  try {

    const product = new Product(title, price, description, imageUrl)
    const object_id = await product.save()
    res.redirect('/')
  } catch (error) {
    console.log('Save operation failed ', error.message);
  }

  // req.user.createProduct({
  //   title,
  //   imageUrl,
  //   price,
  //   description, 
  // }) 
  // );
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
  // Product.create({
  //   title,
  //   imageUrl,
  //   price,
  //   description,
  // })
  // .then((result) => {
  //   console.log("Product Created")
  //   res.redirect('/admin/products')
  // })
  // .catch((err) => console.log(err));
};
exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  let product;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  try {
    product = await Product.findById(prodId)
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      btnTitle: "Update Product",
      labelTitle: "Title",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  } catch (error) {
    console.log('Edit product failed ', error.message)
  }
  // Product.findByPk(prodId)
  // req.user.getProducts({
  //     where: {
  //       id: prodId
  //     }
  //   })
  //   .then((products) => {
  //     const product = products[0]
  //     if (!product) {
  //       return res.redirect("/");
  //     }
  // res.render("admin/edit-product", {
  //   docTitle: "Edit Product",
  //   btnTitle: "Update Product",
  //   labelTitle: "Title",
  //   path: "/admin/edit-product",
  //   editing: editMode,
  //   product: product
  // });
  // })
  // .catch((err) => console.log(err));
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

exports.postEditProduct = async (req, res, next) => {

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.desc;
  let product;
  try {
    product = await new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);
    const object_id = await product.save()
    console.log('Product updated')
    res.redirect("/admin/products");
  } catch (error) {
    console.log('Error during updating product ', error.message)
  }
  // Product.findByPk(req.body.productId)
  //   .then((product) => {
  //     product.title = req.body.title;
  //     product.imageUrl = req.body.imageUrl;
  //     product.price = req.body.price;
  //     product.description = req.body.description;
  //     return product.save();
  //   })
  //   .then((result) => {
  //     res.redirect("/admin/products");
  //     console.log("Updated Product ");
  //   })
  //   .catch((err) => console.log(err));
  // // updatedProd.save();
};

exports.getProducts = async (req, res, next) => {
  // Product.findAll()
  let products;
  try {
    products = await Product.fetchAll();
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products"
    });
  } catch (error) {
    console.log('FETCH Error ', error.message)
  }
  // req.user.getProducts()
  //   .then((products) => {
  //     res.render("admin/products", {
  //       prods: products,
  //       docTitle: "Admin Products",
  //       path: "/admin/products"
  //     });
  //   })
  //   .catch((err) => console.log(err));
  // const products = Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     docTitle: "Admin Products",
  //     path: "/admin/products"
  //   });
  // });
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.deleteById(prodId)
    console.log('Product deleted');
    res.redirect("/admin/products");
  } catch (error) {
    console.log('Error during deleting product', error.message)
  }
  // Product.deleteById(prodId);
  // Product.findByPk(prodId)
  //   .then((product) => product.destroy())
  //   .then(result => {
  //     console.log('Product Destroyed ', product.title);
  //     res.redirect("/admin/products");

  //   })
  //   .catch((err) => console.log(err));
};
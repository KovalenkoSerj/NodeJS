const Product = require("../models/product");
const util = require("util");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Library",
    btnTitle: "Submit",
    labelTitle: "Title",
    path: "/admin/edit-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn

  });
};

exports.addProduct = async (req, res, next) => {

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  try {
    const product = new Product({
      title,
      imageUrl,
      price,
      description,
      userId: req.user[0]
    });
    const object_id = await product.save();
    console.log("Product created", object_id);
    res.redirect("/");
  } catch (error) {
    console.log("Save operation failed ", error.message);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  let product;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  try {
    product = await Product.findById(prodId);
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      btnTitle: "Update Product",
      labelTitle: "Title",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn

    });
  } catch (error) {
    console.log("Edit product failed ", error.message);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  try {
    const product = await Product.findById(prodId);
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    const object_id = await product.save();
    console.log("Product updated", object_id);
    res.redirect("/admin/products");
  } catch (error) {
    console.log("Error during updating product ", error.message);
  }
};

exports.getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log("FETCH Error ", error.message);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findByIdAndRemove(prodId);
    console.log("Product deleted", product);
    res.redirect("/admin/products");
  } catch (error) {
    console.log("Error during deleting product", error.message);
  }
};
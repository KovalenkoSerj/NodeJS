const Product = require("../models/product");
const util = require("util");
const fileHelper = require("../util/file");
const mongodb = require("mongodb");
const {
  validationResult
} = require('express-validator')
const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {

  res.render("admin/edit-product", {
    docTitle: "Library",
    btnTitle: "Submit",
    labelTitle: "Title",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null


  });
};

exports.addProduct = async (req, res, next) => {

  const title = req.body.title;
  // const imageUrl = req.body.imageUrl;
  const image = req.file
  const price = req.body.price;
  const description = req.body.description;
  if (!image) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add Product",
      btnTitle: "Add Product",
      labelTitle: "Title",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title,
        price,
        description
      },
      errorMsg: 'Attached file is not an image'


    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add Product",
      btnTitle: "Add Product",
      labelTitle: "Title",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title,
        price,
        description
      },
      errorMsg: errors.array()[0].msg


    });

  try {
    const imageUrl = image.path;
    const product = new Product({
      title,
      imageUrl,
      price,
      description,
      userId: req.user
    });

    const savedProd = await product.save();
    res.redirect("/");
    console.log('Product has been saved', savedProd);
  } catch (error) {
    console.log("Save operation failed ", error.message);
    const err = new Error(error.message);
    err.httpStatus = 500;
    return next(err)
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
    console.log(product)
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      btnTitle: "Update Product",
      labelTitle: "Title",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
      hasError: false,
      errorMsg: false
    });
  } catch (error) {
    console.log("Edit product failed ", error.message);
    return next(err)
  }
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Edit Product",
      btnTitle: "Update Product",
      labelTitle: "Title",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId,
      },
      errorMsg: errors.array()[0].msg
    });
  }

  try {
    const product = await Product.findById(prodId);
    if (product.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/')
    }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    if (image) {
      fileHelper.deleteFile(product.imageUrl);

      product.imageUrl = image.path
    }
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
    products = await Product.find({
      userId: req.user._id
    });
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.log("FETCH Error ", error.message);
  }
};

exports.deleteProduct = async (req, res, next) => {

  try {
    const prodId = req.params.productId;
    const prod = await Product.findById(prodId);
    if (!prod) {
      return next(new Error('Product not found'));
    }
    const product = await Product.deleteOne({
      _id: prodId,
      userId: req.user._id
    })
    fileHelper.deleteFile(prod.imageUrl);

    console.log("Product deleted", product);
    // res.redirect("/admin/products");
    res.status(200).json({message: 'Success delete product'})
  } catch (error) {
    res.status(500).json({message: 'Deleting product failed'})
  }
};
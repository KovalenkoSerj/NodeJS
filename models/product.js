const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Product', productSchema)





// // const Sequelize = require('sequelize');

// // const sequelize = require('../util/database');
// const mongodb = require('mongodb');
// const mongoConnect = require('../util/database');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   async save() {
//     const db = await mongoConnect();
//     let object;
//     try {
//       if (this._id) {
//         object = await db.collection('products').updateOne({
//           _id: this._id
//         }, {
//           $set: this
//         })
//         console.log('Product Updated')
//       } else {
//         object = await db.collection('products').insertOne(this)
//         console.log('Product Inserted', object)
//       }
//     } catch (error) {
//       console.log('Insert/Update Error', error.message)
//     }
//     return object
//   }

//   static async fetchAll() {
//     let products;
//     try {
//       const db = await mongoConnect();
//       products = await db.collection('products').find().toArray();
//     } catch (error) {
//       console.log('Fetching Error', error.message)
//     }

//     return products;
//   }


//   static async findById(id) {
//     let product;
//     try {
//       const db = await mongoConnect();
//       const objId = new mongodb.ObjectId(id)
//       product = await db.collection('products').findOne({
//         _id: objId
//       })
//     } catch (error) {
//       console.log('Fetching Product Id Error', error.message)
//     }
//     return product;
//   }

//   static async deleteById(id) {
//     let product;
//     try {
//       const db = await mongoConnect();
//       const objId = new mongodb.ObjectId(id)
//       product = await db.collection('products').deleteOne({
//         _id: objId
//       })
//     } catch (error) {
//       console.log('Error during deleting product ', error.message)
//     }
//   }
// }




// module.exports = Product;

// // const Product = sequelize.define('product', {
// //    id: {
// //      type: Sequelize.INTEGER,
// //      autoIncrement: true,
// //      allowNull: false,
// //      primaryKey: true
// //    },
// //    title: {
// //      type: Sequelize.STRING,
// //      allowNull: false
// //    },
// //    price: {
// //      type: Sequelize.DOUBLE,
// //      allowNull: false
// //    },
// //    imageUrl : {
// //      type: Sequelize.STRING,
// //      allowNull: false
// //    },
// //    description: {
// //      type: Sequelize.STRING,
// //      allowNull: false
// //    }
// // });


// // // const fs = require('fs');
// // // const path = require('path');
// // const rootDir = require("../util/path");
// // // const p = path.join(rootDir, 'data', 'products.json');
// // const Cart = require("./cart");
// // const db = require("../util/database");
// // //

// // module.exports = class Product {
// //   constructor(id, title, imageUrl, price, description) {
// //     this.id = id;
// //     this.title = title;
// //     this.imageUrl = imageUrl;
// //     this.price = price;
// //     this.description = description;
// //   }

// //   save() {
// //     // getProductsFromFile(products => {
// //     //     if (this.id) {
// //     //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
// //     //         const updatedProduct = [...products];
// //     //         updatedProduct[existingProductIndex] = this;
// //     //         fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
// //     //             console.log(err)
// //     //         })
// //     //     } else {
// //     //         this.id = new Date();
// //     //         products.push(this);
// //     //         fs.writeFile(p, JSON.stringify(products), (err) => {
// //     //             console.log(err)
// //     //         })
// //     //     }

// //     // })
// //     // const p = path.join(rootDir, 'data', 'products.json');
// //     return db.execute(
// //       'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
// //       [this.title, this.price, this.imageUrl, this.description]
// //     );
// //   }

// //   static fetchAll() {
// //     return db.execute("SELECT * FROM products");
// //   }

// //   static findById(id) {
// //       return db.execute('SELECT * FROM products WHERE products.id = ?' , [id])
// //   }
// //   // static deleteById(id){
// //   // getProductsFromFile(products => {
// //   //     const product = products.find(prod => prod.id === id)
// //   //     const productIndex = products.filter(p => p.id !== id);
// //   //     fs.writeFile(p, JSON.stringify(productIndex), err => {
// //   //         if(!err){
// //   //          console.log('test');
// //   //          Cart.deleteProduct(id, product.price)
// //   //         }
// //   //     });

// //   // })
// //   // }

// //   // static fetchAll(cb) {
// //   // getProductsFromFile(cb)
// //   // }

// //   // static findById(id, cb) {
// //   // getProductsFromFile(products => {
// //   //     const product = products.find(p => p.id === id);
// //   //     cb(product)
// //   // })
// //   // }
// // };

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true
   },
   title: {
     type: Sequelize.STRING,
     allowNull: false
   },
   price: {
     type: Sequelize.DOUBLE,
     allowNull: false
   },
   imageUrl : {
     type: Sequelize.STRING,
     allowNull: false
   },
   description: {
     type: Sequelize.STRING,
     allowNull: false
   }
});

module.exports = Product;

// // const fs = require('fs');
// // const path = require('path');
// const rootDir = require("../util/path");
// // const p = path.join(rootDir, 'data', 'products.json');
// const Cart = require("./cart");
// const db = require("../util/database");
// //

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     // getProductsFromFile(products => {
//     //     if (this.id) {
//     //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//     //         const updatedProduct = [...products];
//     //         updatedProduct[existingProductIndex] = this;
//     //         fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
//     //             console.log(err)
//     //         })
//     //     } else {
//     //         this.id = new Date();
//     //         products.push(this);
//     //         fs.writeFile(p, JSON.stringify(products), (err) => {
//     //             console.log(err)
//     //         })
//     //     }

//     // })
//     // const p = path.join(rootDir, 'data', 'products.json');
//     return db.execute(
//       'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//       return db.execute('SELECT * FROM products WHERE products.id = ?' , [id])
//   }
//   // static deleteById(id){
//   // getProductsFromFile(products => {
//   //     const product = products.find(prod => prod.id === id)
//   //     const productIndex = products.filter(p => p.id !== id);
//   //     fs.writeFile(p, JSON.stringify(productIndex), err => {
//   //         if(!err){
//   //          console.log('test');
//   //          Cart.deleteProduct(id, product.price)
//   //         }
//   //     });

//   // })
//   // }

//   // static fetchAll(cb) {
//   // getProductsFromFile(cb)
//   // }

//   // static findById(id, cb) {
//   // getProductsFromFile(products => {
//   //     const product = products.find(p => p.id === id);
//   //     cb(product)
//   // })
//   // }
// };



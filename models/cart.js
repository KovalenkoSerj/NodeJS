// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Cart =  sequelize.define('cart', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true, 
//         allowNull: false,
//         primaryKey : true
//     }
// });

// module.exports = Cart





























// const fs = require('fs');
// const path = require('path')
// const p = path.join(path.dirname(process.mainModule.filename),
//     'data',
//     'cart.json'
// );


// module.exports = class Cart {
//     static addProduct(id, productPrice) {
//         fs.readFile(p, (err, filecontent) => {
//             let cart = {
//                 products: [],
//                 totalPrice: 0
//             }
//             if (!err) {
//                 cart = JSON.parse(filecontent)
//             }
//             const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//             const existingProduct = cart.products[existingProductIndex]
//             let updatedProd;
//             if (existingProduct) {
//                 updatedProd = {
//                     ...existingProduct
//                 };
//                 updatedProd.qty += 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProd;
//             } else {
//                 updatedProd = {
//                     id: id,
//                     qty: 1
//                 };
//                 cart.products = [...cart.products, updatedProd]

//             }
//             cart.totalPrice = cart.totalPrice + (+productPrice);
//             fs.writeFile(p, JSON.stringify(cart), err => {
//                 console.log(err);
//             })
//         })


//     }

//     static deleteProduct(id, price) {
//         fs.readFile(p, (err, filecontent) => {
//             if (err)
//                 return;

//             const updatedCart = {
//                 ...JSON.parse(filecontent)
//             };
//             console.log(updatedCart)
//             const product = updatedCart.products.find(prod => prod.id === id);
//             if(!product){
//                 return
//             }
//             const productQty = product.qty;
//             updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;
//             updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
//             fs.writeFile(p, JSON.stringify(updatedCart), err => {
//                 console.log(err);
//             })
//         })
//     }


//     static getCart(cb) {
//         fs.readFile(p, (err, filecontent) => {
//             const cart = JSON.parse(filecontent);
//             if(err){
//                 cb([])
//             }else {  
//                 cb(cart)
//             }
//         })
//     }
// }
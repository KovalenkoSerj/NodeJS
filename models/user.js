// const mongoConnect = require("../util/database");
// const mongodb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    },
    resetToken: String,
    resetTokenExpire: Date,
})

userSchema.methods.addToCart = async function (product) {
    const cartProduct = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQty = 1;
    const updCartItems = [...this.cart.items];
    if (cartProduct >= 0) {
        newQty = this.cart.items[cartProduct].quantity + 1;
        updCartItems[cartProduct].quantity = newQty;
    } else {
        updCartItems.push({
            productId: product._id,
            quantity: newQty
        });
    }
    const updCart = {
        items: updCartItems
    };
    this.cart = updCart;
    return await this.save();
}

userSchema.methods.removeFromCart = function (id) {
    const updCart = this.cart.items.filter(
        (p) => p.productId.toString() !== id.toString()
    );
    this.cart.items = updCart;
    return this.save()
}
userSchema.methods.clearCart = function(){
    this.cart = {items: []};
    return this.save()
}

module.exports = mongoose.model('User', userSchema)
// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }
//   async save() {
//     const db = await mongoConnect();
//     let object;
//     try {
//       const user = await db.collection("users").findOne({
//         email: this.email
//       });
//       if (user) {
//         object = user;
//         console.log("User Already Exist");
//       } else {
//         object = await db.collection("users").insertOne(this);
//       }
//     } catch (error) {
//       console.log("Login flow failed", error.message);
//     }
//     return object;
//   }
//   async getCart() {
//     console.log("TEST", this.cart.items);
//     const prodIds = await this.cart.items.map((i) => {
//       return i.productId;
//     });
//     const db = await mongoConnect();

//     const prods = await db
//       .collection("products")
//       .find({
//         _id: {
//           $in: prodIds
//         }
//       })
//       .toArray();
//     return prods.map((p) => {
//       return {
//         ...p,
//         quantity: this.cart.items.find((i) => {
//           return i.productId.toString() === p._id.toString();
//         }).quantity
//       };
//     });
//   }
//   async addToCart(product) {
//     const cartProduct = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQty = 1;
//     const updCartItems = [...this.cart.items];
//     console.log(this.cart.items);
//     if (cartProduct >= 0) {
//       newQty = this.cart.items[cartProduct].quantity + 1;
//       updCartItems[cartProduct].quantity = newQty;
//     } else {
//       updCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQty
//       });
//     }
//     const updCart = {
//       items: updCartItems
//     };
//     const db = await mongoConnect();
//     const object = await db.collection("users").updateOne(
//       {
//         _id: new ObjectId(this._id)
//       },
//       {
//         $set: {
//           cart: updCart
//         }
//       }
//     );
//     console.log("Updated ", object);
//   }

//   static async findByEmail(email) {
//     const db = await mongoConnect();
//     return await db.collection("users").findOne({
//       email: email
//     });
//   }

//   async deleteCartItem(id) {
//     const updCart = this.cart.items.filter(
//       (p) => p.productId.toString() !== id.toString()
//     );
//     const db = await mongoConnect();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new Object(this._id) },
//         { $set: { cart: { items: updCart } } }
//       );
//   }

//   async addOrder() {
//     const db = await mongoConnect();
//     const cart = await this.getCart();

//     const order = {
//       items: cart,
//       user: {
//         _id: new ObjectId(this._id),
//         name: this.email
//       }
//     };
//     const insert = await db.collection("orders").insertOne(order);
//     this.cart = { items: [] };
//     await db.collection("users").updateOne(
//       {
//         _id: new ObjectId(this._id)
//       },
//       {
//         $set: {
//           cart: { items: [] }
//         }
//       }
//     );
//   }

//   async getOrders() {
//     const db = await mongoConnect();
//     return await db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray()
//   }
// }

// // const Sequelize = require('sequelize');

// // const sequelize = require('../util/database');

// // const User = sequelize.define('user', {
// //     id: {
// //         type: Sequelize.INTEGER,
// //         autoIncrement: true,
// //         autoNull: false,
// //         primaryKey: true

// //     },
// //     name: Sequelize.STRING,
// //     email: Sequelize.STRING

// // })

// module.exports = User;
const {
    ObjectId
} = require('bson');
const mongoConnect = require('../util/database')

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    async save() {
        const db = await mongoConnect();
        let object;
        try {
            const user = await db.collection('users').findOne({
                email: this.email
            });
            if (user) {
                object = user;
                console.log('User Already Exist')
            } else {
                object = await db.collection('users').insertOne(this)
            }

        } catch (error) {
            console.log('Login flow failed', error.message)
        }
        return object
    }
    async getCart() {
        console.log('TEST' , this.cart.items)
        const prodIds = await this.cart.items.map(i => {
            return i.productId
        })
        const db = await mongoConnect();

        const prods = await db.collection('products').find({
            _id: {
                $in: prodIds
            }
        }).toArray();
        return prods.map(p => {
            return {
                ...p,
                quantity: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString();
                }).quantity
            }
        })
    }
    async addToCart(product) {
        const cartProduct = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        })
        let newQty = 1;
        const updCartItems = [...this.cart.items];
        console.log(this.cart.items)
        if (cartProduct >= 0) {
            newQty = this.cart.items[cartProduct].quantity + 1;
            updCartItems[cartProduct].quantity = newQty;
        } else {
            updCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQty
            })
        }
        const updCart = {
            items: updCartItems
        }
        const db = await mongoConnect();
        const object = await db.collection('users').updateOne({
            _id: new ObjectId(this._id)
        }, {
            $set: {
                cart: updCart
            }
        })
        console.log('Updated ', object)
    }

    static async findByEmail(email) {
        const db = await mongoConnect();
        return await db.collection('users').findOne({
            email: email
        })
    }

    async deleteCartItem(id){
        const updCart = this.cart.items.filter(p => p.productId.toString() !== id.toString());
        const db = await mongoConnect();
        return db.collection('users').updateOne({_id: new Object(this._id)}, {$set: {cart: {items : updCart}}})
    }
    
}



// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         autoNull: false,
//         primaryKey: true

//     },
//     name: Sequelize.STRING,
//     email: Sequelize.STRING

// })

module.exports = User;
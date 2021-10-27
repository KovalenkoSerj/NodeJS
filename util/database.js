// const mysql = require('mysql2');

//  const pool = mysql.createPool({
//      host: 'localhost',
//      user: 'root',
//      database: 'node_complete',
//      password: 'rootroot'
//  })

//  module.exports = pool.promise()

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node_complete", "root", "rootroot", {
//   dialect: "mysql",
//   host: "localhost"
// });

// module.exports = sequelize;

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
let _db;


const mongoConnect = async () => {
    if (_db) {
        console.log('Database already connected')
        return _db
    }

    try {
        const client = await MongoClient.connect('mongodb+srv://serhii:rootroot@cluster0.n6xnp.mongodb.net/Shop?retryWrites=true&w=majority')
        _db = client.db()
    } catch (e) {
        console.log("Error", e)
    }
    return _db

}

module.exports = mongoConnect;
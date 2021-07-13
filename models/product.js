const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'products.json');


const getProductsFromFile = cb => {
    
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([])
        }
        cb(JSON.parse(fileContent))
    })
}

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description
    }

    save() {
        this.id = new Date();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
        const p = path.join(rootDir, 'data', 'products.json');
        
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
 
    static findById(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product)
        })
    }
}
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
    constructor(title, price, description) {
        this.title = title;
        this.price = price;
        this.description = description
    }

    save() {
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
}
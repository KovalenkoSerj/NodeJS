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
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description
    }

    save() {

        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;                
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log(err)
                })
            } else {
                this.id = new Date();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }

        })
        const p = path.join(rootDir, 'data', 'products.json');

    }

    static deleteById(id){
        getProductsFromFile(products => {
            const productIndex = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(productIndex), err => {
                if(!err){
                 console.log('test');
                }
            });
          

        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product)
        })
    }

  

}
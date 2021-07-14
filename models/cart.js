const fs = require('fs');
const path = require('path')
    const p = path.join(path.dirname(process.mainModule.filename),
                'data',
                'cart.json'
            );


module.exports = class Cart {
    static addProduct(id, productPrice){
        fs.readFile(p, (err, filecontent) => {
            let cart = { products: [], totalPrice: 0}
            if(!err) {
                cart = JSON.parse(filecontent)
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex]
            let updatedProd;
            if(existingProduct) {
                updatedProd = {...existingProduct };
                updatedProd.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProd;
            } else {
                updatedProd = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProd]

            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
      
        
    }

    static deleteProduct(id, price) { 
     
    }
}
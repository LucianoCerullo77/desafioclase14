const fs = require('fs')

module.exports = class Products {
    constructor(file) {
        this.file = file
        this.products = JSON.parse(fs.readFileSync(file, 'utf-8'))
    }

    create(obj) {
        let id 
        if (this.products.length === 0) {
            id = this.products.length + 1
    }
    else {
        id = this.products[this.products.length - 1].id + 1
    }}
}
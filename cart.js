const fs = require('fs')

module.exports = class Cart {
    constructor(file) {
        this.file = file
        this.cart = JSON.parse(fs.readFileSync(file, 'utf-8'))
    }

    create() {
        let id
        if (this.cart.length === 0) {
            id = this.cart.length + 1
        }
        else {
            id = this.cart[this.cart.length - 1].id + 1
        }

        let timestamp = new Date()
        const cart = {
            id: id,
            timestamp: timestamp,
            ...obj
        }
        this.cart.push(cart)
        fs.writeFileSync(this.file, JSON.stringify(this.cart))
        return cart
    }

    delete(id) {
        const index = this.cart.findIndex(cart => cart.id === id)
        if (index === -1) {
            return ({error: -1, descripcion: 'No se encontró el producto en el  carrito'})
        }
        else {
            this.cart.splice(index, 1)
            fs.writeFileSync(this.file, JSON.stringify(this.cart))
            return('Producto eliminado del carrito correctamente')
        }
    }

    getCartProducts(id) {
        const cart = this.cart.find(cart => cart.id === id)
        return cart
    }

    addProduct(id, obj) {
        const index = this.cart.findIndex(cart => cart === id)
        this.cart[index].obj = obj
        fs.writeFileSync(this.file, JSON.stringify(this.cart))
        return('Producto agregado al carrito correctamente. ID:' + id)
    }

    deleteProduct(id, obj) {
        const index = this.cart.findIndex(cart => cart === id)
        const index2 = this.cart[index].obj.findIndex(obj => obj === id)

        if (index === -1) {
            return ({error: -1, descripcion: 'No se encontró el producto en el  carrito'})
        }
        else {
            this.cart[index].obj.splice(index2, 1)
            fs.writeFileSync(this.file, JSON.stringify(this.cart))
            return('Producto eliminado del carrito correctamente')  
        }
    }
}
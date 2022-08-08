const fs = require('fs')

const date = new Date()
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
    }

    let timestamp = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
    const product = {
        id: id,
        timestamp: timestamp,
        ...obj
    }
    this.products.push(product)
    fs.writeFileSync(this.file, JSON.stringify(this.products))
    return product
}

    update(id, obj) {
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) {
            return ({error: -1, descripcion: 'No se encontró el producto'})
        }
        else {
            this.products[index].nombre = obj.nombre || this.products[index].nombre
            this.products[index].precio = obj.precio || this.products[index].precio 
            this.products[index].descripcion = obj.descripcion || this.products[index].descripcion
            this.products[index].fotoURL = obj.fotoURL || this.products[index].fotoURL
            this.products[index].stock = obj.stock || this.products[index].stock

            fs.writeFileSync(this.file, JSON.stringify(this.products))
            return('Producto actualizado correctamente')
        }
    }

    getId(id) {
        const product = this.products.find(product => product.id === id)
        if (!product) {
            return ({error: -1, descripcion: 'No se encontró el producto'})
        }
        else {
            return product
        }
    }


    getAll() {
        return this.products
    }

    delete(id) {
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) {
            return ({error: -1, descripcion: 'No se encontró el producto'})
        }
        else {
            this.products.splice(index, 1)
            fs.writeFileSync(this.file, JSON.stringify(this.products))
            return('Producto eliminado correctamente')
        }
    }

    deleteAll() {
        this.products = []
        fs.writeFileSync(this.file, JSON.stringify(this.products))
        return('Productos eliminados correctamente')
    }
}
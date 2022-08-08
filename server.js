const express = require('express')
const app = express()
const {Router} = require('express')
const ClassProducts = require("./products");
const ClassCart = require("./cart");

const routerProducts = Router()
const routerCart = Router()

app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)

routerProducts.use(express.json())
routerCart.use(express.json())

const products = new ClassProducts('products.json')
const cart = new ClassCart('cartProducts.json')
 
function adminAccess(req, res, next) {
    if (req.body.admin === Boolean(true)) {
        next()
    } else {
        res.send({
            error: -1,
            descripcion: req.protocol + '://' + req.get('host') + req.originalUrl,
            método: req.method,
            status: 'no autorizada'
        })
    }
}

routerProducts.get('/:id?', (req, res) => {
    const id = req.params.id
    if (id) {
        res.send(products.getProduct(id))
    } else {
        res.send(products.getProducts())
    }
})

routerProducts.post('/', adminAccess, (req, res) => {
    const product = products.createProduct(req.body)
    res.send(product)
})

routerProducts.put('/:id', adminAccess, (req, res) => {
    const id = req.params.id
    const product = products.updateProduct(id, req.body)
    res.send(product)
})

routerProducts.delete('/:id', adminAccess, (req, res) => {
    const id = req.params.id
    const product = products.deleteProduct(id)
    res.send(product)
})

routerCart.get('/:id/productos', (req, res) => {
    const id = req.params.id
    const cart = cart.getCartProducts(id)
    res.send(cart)
})

routerCart.post('/:id/productos', (req, res) => {
    const id = req.params.id
    const cart = cart.addProduct(id, req.body)
    res.send(cart)
})

routerCart.delete('/:id/productos/:idProducto', (req, res) => {
    const id = req.params.id
    const idProducto = req.params.idProducto
    const cart = cart.deleteProduct(id, idProducto)
    res.send(cart)
})

app.get('*', (req, res) => {
    res.send({
        error: -2,
        descripcion: req.protocol + '://' + req.get('host') + req.originalUrl,
        método: req.method,
        status: 'error : Ruta inexistente'
    })
})

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080')
})

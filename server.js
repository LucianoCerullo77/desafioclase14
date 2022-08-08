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

const products = new ClaseProductos('products.json')
const cart = new ClaseCarritos('cartProducts.json')
 
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



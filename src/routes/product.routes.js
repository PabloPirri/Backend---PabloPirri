import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager('./src/info.txt')

const productRouter = Router()

productRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.send(products)
    } catch (error) {
        res.send(error)
    }

})

productRouter.get("/:id", async (req, res) => {
    const products = await productManager.getProducts();
    const product = await products.find(producto => producto.id === parseInt(req.params.id)); 
    if (product) {
        res.send(`El producto ${product.title} esta asociado al id ${req.params.id} se llama `)
    } else {
        res.send(`No se encuentra producto asociado al id ${req.params.id} proporcionado`)
    }
})

productRouter.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    await productManager.addProduct(title, description, price, thumbnail, code, stock )
    res.send("Producto creado")
})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } = req.body

    await productManager.updateProduct(id, {title, description, price, thumbnail, code, stock})

    res.send(mensaje)
})

productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})

export default productRouter
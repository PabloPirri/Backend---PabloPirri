import express from 'express'
import { ProductManager } from './ProductManager.js'

// Importo
const productManager = new ProductManager('./src/info.txt');

const app = express();

const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Servidor creado con Express")
})

//Consulta de producto por id
app.get('/product/:id', async (req, res) => {
    const products = await productManager.getProducts();
    const product = await products.find(producto => producto.id === parseInt(req.params.id)); 
    if (product) {
        res.send(`El producto ${product.title} esta asociado al id ${req.params.id} se llama `)
    } else {
        res.send(`No se encuentra producto asociado al id ${req.params.id} proporcionado`)
    }

})

app.get('/product', async (req, res) => {
    const products = await productManager.getProducts();
    res.send(JSON.stringify(products))
})
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
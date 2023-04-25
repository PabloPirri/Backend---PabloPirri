import express from 'express'
import productRouter from './routes/Product.routes.js';
import multer from 'multer'
import { __dirname,__filename } from './Path.js'


const app = express();

const PORT = 4000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //Destino de mis imagenes cargadas
        cb(null, './src/Public/Img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = (multer({ storage: storage }))

app.use('/static', express.static(__dirname + '/public'))
app.use('/product', productRouter);
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")
})

// app.get('/', (req, res) => {
//     res.send("Servidor creado con Express")
// })

// //Consulta de producto por id
// app.get('/:id', async (req, res) => {
//     const products = await productManager.getProducts();
//     const product = await products.find(producto => producto.id === parseInt(req.params.id)); 
//     if (product) {
//         res.send(`El producto ${product.title} esta asociado al id ${req.params.id} se llama `)
//     } else {
//         res.send(`No se encuentra producto asociado al id ${req.params.id} proporcionado`)
//     }

// })

// app.get('/', async (req, res) => {
//     let { limit } = req.query
//     const products = await productManager.getProducts();
//     if (products.length < limit) {
//         res.send(`Exedio el limite maximo de productos`)
//     } else {
//         const prodLimit = await products.slice(0, limit)
//         res.send(JSON.stringify(prodLimit))
//     }
// })
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
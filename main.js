import { error } from 'console';
import { promises as fs } from 'fs'

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.id = 0;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }
  
class ProductManager {
  constructor(path) {
      this.path = path;
      this.products = [];
  }

    async addProduct(title, description, price, thumbnail, code, stock) {

      try{
        // Creo una constante para no repetir codigo
        const prods = await productManager.getProducts();
  
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
          throw new Error('Error: todos los campos son obligatorios');
        }

        // Validar que no se repita el campo "code"
        if (prods.some(product => product.code === code)) {
          throw new Error('Error: ya existe un producto con este código');
        }

        // Crear nuevo producto
        const newProduct = new Product(title, description, price, thumbnail, code, stock);   

        // Generar id autoincrementable
        newProduct.id = prods.length + 1;
        
        // Agregar nuevo producto al arreglo de productos
        prods.push(newProduct);
  
        //Reescribe el archivo consultado con el nuevo producto convertido a String 
        await fs.writeFile(this.path, JSON.stringify(prods))
  
        return console.log(`Producto agregado con éxito: ${newProduct.title}`);

      }catch (error) {
        console.error(`Error al agregar producto: ${error.message}`);
      }
    }
  
    async getProducts() {

      // Leo el archivo txt y lo retorno como JSON
      const prods = await fs.readFile(this.path, 'utf-8')
      return JSON.parse(prods)
    }
  
    async getProductById(id) {

      try{
        // Creo una constante para no repetir codigo
        const prods = await productManager.getProducts();
  
        // Encontrar el producto por su ID
        const product = prods.some(prod => prod.id === parseInt(id));
        if (!product) {
          throw new Error(`Error: no se encontró ningún producto con id ${id}`);
        }
        return console.log(prods.find(prod => prod.id === parseInt(id)));
      }catch(error){
        console.error(error)
       }

      }

    async updateProduct(id, title, description, price, thumbnail, code, stock) {
      try{

        // Creo una constante para no repetir codigo
        const prods = await productManager.getProducts();
  
        // Encontrar el producto por su ID
        const productIndex = prods.findIndex(product => product.id === id);
    
        if (productIndex === -1) {
          throw new Error(`Error: no se encontró ningún producto con id ${id}`);
        }
    
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
          throw new Error('Error: todos los campos son obligatorios');
        }
    
        // Validar que no se repita el campo "code" excepto para el producto que se está actualizando
        if (prods.some(product => product.code === code && product.id !== id)) {
          throw new Error('Error: ya existe un producto con este código');
        }
        // Actualizar los campos del producto
        prods[productIndex].title = title;
        prods[productIndex].description = description;
        prods[productIndex].price = price;
        prods[productIndex].thumbnail = thumbnail;
        prods[productIndex].code = code;
        prods[productIndex].stock = stock;

        //Reescribe el archivo consultado con el producto actualizado convertido a String 
        await fs.writeFile(this.path, JSON.stringify(prods))
        return console.log(`Producto actualizado con éxito: ${title}`);
      }catch(error){
        console.error(error);
        throw error;
       }
    }
  
    async deleteProduct(id) {
      try{
        // Creo una constante para no repetir codigo
        const prods = await productManager.getProducts();
  
        // Encontrar el producto por su ID
        const productIndex = prods.findIndex(product => product.id === id);
    
        if (productIndex === -1) {
          throw error(`Error: no se encontró ningún producto con id ${id}`);
        }
        // Eliminar el producto del arreglo de productos
        const deletedProduct = prods.splice(productIndex, 1)[0];
    
        //Reescribe el archivo consultado con el producto actualizado convertido a String 
        await fs.writeFile(this.path, JSON.stringify(prods))
        return console.log(`Producto eliminado con éxito: ${deletedProduct.title}`);
      }catch(error){
        console.error(error);
       }
    }
}
  
const productManager = new ProductManager('./info.txt');
// console.log("inicio proceso");
// console.log(productManager.getProducts());


await productManager.addProduct("Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", 8);

await productManager.addProduct("Bajo mesada", "Mueble de cocina", 60000, "foto_2", "abc234", 8);

await productManager.addProduct("Cama 2 plazas", "Mueble de dormitorio", 100000, "foto_3", "bcd123", 10);

await productManager.addProduct("Cama 1 plazas", "Mueble de dormitorio", 80000, "foto_4", "bcd234", 20);

await productManager.addProduct("Bibliteca 3 cuerpos", "Mueble de Living", 90000, "foto_5", "cde123", 5);

await productManager.addProduct("Bibliteca 2 cuerpos", "Mueble de Living", 70000, "foto_6", "cde234", 3);
 
console.log("inicio proceso");
// Agregar un nuevo producto con el mismo código
await productManager.addProduct("Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", 8);
console.log("inicio proceso");
// Agregar un nuevo producto con campo incompleto
await productManager.addProduct("Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", );

//Obtener un producto por su id
console.log("inicio proceso");
await productManager.getProductById(2);
console.log("fin proceso");

// Obtener un producto por un id inexistente
console.log("inicio proceso");
await productManager.getProductById(10);
console.log("fin proceso");

console.log("inicio proceso");
await productManager.updateProduct(1, "Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", 9);
console.log("fin proceso");

//Actualizar un producto no existente
// console.log("inicio proceso");
// await productManager.updateProduct(10, "Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", 9);
// console.log("fin proceso");

// Eliminar un producto existente
console.log("inicio proceso");
await productManager.deleteProduct(6);
console.log("fin proceso");

// Eliminar un producto no existente
console.log("inicio proceso");
await productManager.deleteProduct(10);
console.log("fin proceso");


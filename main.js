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
    constructor() {
      this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Error: todos los campos son obligatorios');
        return;
      }
  
      // Validar que no se repita el campo "code"
      if (this.products.some(product => product.code === code)) {
        console.error('Error: ya existe un producto con este código');
        return;
      }
  
      // Crear nuevo producto
      const newProduct = new Product(title, description, price, thumbnail, code, stock);
  
      // Generar id autoincrementable
      newProduct.id = this.products.length + 1;
  
      // Agregar nuevo producto al arreglo de productos
      this.products.push(newProduct);
      console.log(`Producto agregado con éxito: ${newProduct.title}`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error(`Error: no se encontró ningún producto con id ${id}`);
        return;
      }
      return product;
    }
  }
  
const productManager = new ProductManager();
console.log(productManager.getProducts());
  
productManager.addProduct("Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", 8);
console.log(productManager.getProducts());

productManager.addProduct("Bajo mesada", "Mueble de cocina", 60000, "foto_2", "abc234", 8);
console.log(productManager.getProducts());

productManager.addProduct("Cama 2 plazas", "Mueble de dormitorio", 100000, "foto_3", "bcd123", 10);
console.log(productManager.getProducts());

productManager.addProduct("Cama 1 plazas", "Mueble de dormitorio", 80000, "foto_4", "bcd234", 20);
console.log(productManager.getProducts());

productManager.addProduct("Bibliteca 3 cuerpos", "Mueble de Living", 90000, "foto_5", "cde123", 5);
console.log(productManager.getProducts());

productManager.addProduct("Bibliteca 2 cuerpos", "Mueble de Living", 70000, "foto_6", "cde234", 3);
console.log(productManager.getProducts());
  
  
// Agregar un nuevo producto con el mismo código (debe arrojar un error)
productManager.addProduct("Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", 8);

// Agregar un nuevo producto con campo incompleto (debe arrojar un error)
productManager.addProduct("Alacena", "Mueble de cocina", 50000, "foto_1", "abc123", );
  
// Obtener un producto por su id (debe devolver el producto agregado)
console.log(productManager.getProductById(4));
  
// Obtener un producto por un id inexistente (debe arrojar un error)
productManager.getProductById(10);

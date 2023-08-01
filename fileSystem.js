import {promises as fs } from "fs"
import { json } from "stream/consumers";

class ProductManager {
    constructor(){
        this.patch = "./productos.txt";
        this.products = []
    }

    static id = 0;

    addproduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)
        
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)

    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("producto no encontrado")
        }else {
            console.log(respuesta3.find(product => product.id === id))
        }

    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("producto eliminado")
    };


    updateProducts = async (id, ...producto) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productsModif = [{ id, ...producto}, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif))

    }



}

const productos = new ProductManager

//productos.addproduct("Titulo1", "description1", 2000, "imagen1", "abc123", 5)
//productos.addproduct("Titulo2", "description2", 3000, "imagen2", "abc124", 6)
//productos.addproduct("Titulo3", "description3", 4000, "imagen3", "abc125", 7)

//productos.getProducts()

//productos.getProductsById(4)

//productos.deleteProductsById(2)

productos.updateProducts({
    title: 'Titulo3',
    description: 'description3',
    price: 5000,
    imagen: 'imagen3',
    code: 'abc125',
    stock: 7,
    id: 3
})
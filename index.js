import express from 'express';
import ProductManager from './managers/ProductManager.js';
let managers = new ProductManager('./files/Products.json');
const app = express();

app.use(express.urlencoded({extended: true}));

const alterProducts = async() => {
    try {

        class CreateProduct {
             //#############{ Constructor }#############
            constructor(title, description, price, thumbnail, stock) {
                this.title = title;
                this.description = description;
                this.price = price;
                this.thumbnail = thumbnail;
                this.stock = stock;
            }
             //#############{ Constructor }#############
        }


        //#############{ Lista de productos que se desean crear }#############
        const products = [
            new CreateProduct("Silla de oficina", "Silla de oficina en excelente estado", 2000, "https://i.ibb.co/P9Ytc2W/1-Silla-de-oficina.png", 20),
            new CreateProduct("Smartwatch", "reloj digital deportivo", 3000, "https://i.ibb.co/0rzKD6R/23-Smartwatch.png", 15),
            new CreateProduct("Silla de oficina", "Silla de oficina en excelente estado", 2000, "https://i.ibb.co/P9Ytc2W/1-Silla-de-oficina.png", 20),
            new CreateProduct("Aro de luz led", "Aro de luz perfecto para grabar vídeos y tomar fotos de alta calidad", 1000, "https://i.ibb.co/HDyLvzT/26-Aro-De-Luz-Led.png", 5),
            new CreateProduct("Cafetera", "El mejor producto de cocina para las mañanas", 500, "https://i.ibb.co/HYFpnNB/18-Cafetera.jpg", 30),
            new CreateProduct("Nevera", "Nevera con refrigerador de calidad incluido", 2500, "https://i.ibb.co/sRjynQH/9-Nevera.jpg", 10),
            new CreateProduct("Batería Portátil", "Con carga rápida para cargar dispositivos en poco tiempo", 1500, "https://i.ibb.co/yybmqN3/29-Bater-a-Port-til.jpg", 15),
            new CreateProduct("Calefactor", "Perfecto para los días de frío", 1000, "https://i.ibb.co/cYTkZ1q/32-Calefactor.jpg", 28),
            new CreateProduct("Mortero", "Para prepara tus recetas favoritas", 450, "https://i.ibb.co/3BJjkpk/19-Mortero.jpg", 36),
            new CreateProduct("Cama", "Con colchón de resorte y una comodidad increíble", 2200, "https://i.ibb.co/1LJdzgT/11-Cama.jpg", 44),
            new CreateProduct("Microondas", "Calienta alimentos rápido y fácil", 1000, "https://i.ibb.co/0XW7K3J/13-Microondas.jpg", 21),
            new CreateProduct("Licuadora", "Prepara jugos y todo tipo de bebidas o salsas", 800, "https://i.ibb.co/Pzy8d9N/12-Licuadora.jpg", 9)
        ];
        //#############{ Lista de productos que se desean crear }#############


        //#############{ Verificando cuales productos se repiten y cuales no para agregar al array }#############
        let uniqueProducts = [];

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productIndex = uniqueProducts.findIndex(uniqueProduct =>
                uniqueProduct.title === product.title &&
                uniqueProduct.description === product.description &&
                uniqueProduct.thumbnail === product.thumbnail
            );
            if (productIndex === -1) {
                uniqueProducts.push(product);
            }else {
                console.log(`El producto ${product.title} está repetido`);
            }
        }
        //#############{ Verificando cuales productos se repiten y cuales no para agregar al array }#############


        //#############{ Agregando productos únicos }#############
        for (let i = 0; i < uniqueProducts.length; i++) {
            const product = uniqueProducts[i];
            await managers.addProduct(product);

            const productResult = await managers.getProductById(i + 1);
            if (productResult) {
                await managers.getProducts();
            } else {
                console.log(`El producto ${product.title} no coincide con su ID`);
                await managers.deleteProductById(i + 1);
            }
        }
        //#############{ Agregando productos únicos }#############


        //#############{ Probando métodos updateProduct y deleteProduct }#############

        await managers.updateProduct(3, {price: 2500, stock: 15}); 
        console.log(`Se ha actualizado ${products[3].title}`);

        await managers.deleteProduct(4);
        console.log(`Se ha eliminado ${products[4].title}`);
        
        //#############{ Probando métodos updateProduct y deleteProduct }#############


        uniqueProducts = await managers.getProducts();
        console.log(uniqueProducts); 
        
        
        //#############{ Funcionamiento de rutas del servidor }#############
        app.get('/products', (req, res) => {
            res.send(uniqueProducts);
        })

        //----------{ path param  }----------
        app.get('/products/:id', (req, res) => {
            const prodId = Number(req.params.id);  
            const product = uniqueProducts.find(u => u.id === prodId);
            if (!product) {
                res.send(`No existe un producto con el ID ${prodId}`);
                return;
            }
            res.send(product);
        });
        //----------{ path param  }----------


        //----------{ query param  }----------
        app.get('/products-search', (req, res) => {
            let limit = parseInt(req.query.limit);
            if (isNaN(limit)) {
                limit = uniqueProducts.length;
            }
            let results = [];
            for (let i = 0; i < limit; i++) {
                results.push(uniqueProducts[i]);
            }
            if(results.length == 0){
                res.send("Debes específicar un límite para traer la cantidad de productos deseada");
                return;
            }
            if (limit > uniqueProducts.length) {
                res.send("El límite especificado es mayor que la cantidad de productos disponibles");
                return;
            }
            res.send(results);
        });
        //----------{ query param  }----------
        //#############{ Funcionamiento de rutas del servidor }#############

        //#############{ Escuchando al puerto 8080 }#############
        app.listen(8080,()=>console.log("Listening on 8080"));
        //#############{ Escuchando al puerto 8080 }#############


    } catch(error){
        console.log(error);
    }
}

alterProducts();
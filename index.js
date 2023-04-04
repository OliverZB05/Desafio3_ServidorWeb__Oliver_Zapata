import ProductManager from './managers/ProductManager.js';
let managers = new ProductManager('./files/Products.json');

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
            new CreateProduct("Cafetera", "El mejor producto de cocina para las mañanas", 500, "https://i.ibb.co/HYFpnNB/18-Cafetera.jpg", 30)
        ];
        //#############{ Lista de productos que se desean crear }#############


        //#############{ Verificando cuales productos se repiten y cuales no para agregar al array }#############
        const uniqueProducts = [];

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

        /* En este caso estoy modificando los productos con los id 3 y 4 para mostrar como funcionan los
        métodos updateProduct y deleteProduct.
        
        updateProduct: actualiza los productos, en este caso quiero que actualice el producto con el id 3
        (producto llamado Aro de luz led) y le cambio el precio a 2500 y el stock a 15
        
        deleteProduct: borra el producto específicado, en este caso quiero que borre el producto con el id 4
        (producto llamado Cafetera) */


        await managers.updateProduct(3, {price: 2500, stock: 15}); 
        console.log(`Se ha actualizado ${products[3].title}`);

        await managers.deleteProduct(4);
        console.log(`Se ha eliminado ${products[4].title}`);
        
        //#############{ Probando métodos updateProduct y deleteProduct }#############

        console.log(uniqueProducts);

    } catch(error){
        console.log(error);
    }
}

alterProducts();